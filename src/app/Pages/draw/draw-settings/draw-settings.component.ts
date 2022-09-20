import { KeyValue } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { DrawCollectionUpsertDTO } from 'src/app/DTOs/Draw/DrawCollectionUpsertDTO';
import { getDrawGroupPolicies } from 'src/app/DTOs/Enums/DrawGroupPolicy';
import { FormGroupTyped } from 'src/app/Material/types';
import { TestCreateDialogService } from '../../test/test-create-dialog/test-create-dialog.service';
import { DrawSettingsService } from './draw-settings.service';
import { v4 as guid } from 'uuid';
import { filter } from 'mathjs';

@Component({
  selector: 'app-draw-settings',
  templateUrl: './draw-settings.component.html',
  styleUrls: ['./draw-settings.component.scss']
})
export class DrawSettingsComponent {

  formGroup: FormGroupTyped<DrawCollectionUpsertDTO>;
  formControlIsGroup: FormControl;
  formControlGroupFilter = new FormControl('');
  filteredOptions$: Observable<KeyValue<string, string>[]>;
  policies = getDrawGroupPolicies();
  collectionId: string;
  activePageId: string;

  constructor(
    private drawSettingsService: DrawSettingsService,
    private dialogRef: MatDialogRef<DrawSettingsComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private testCreateDialogService: TestCreateDialogService,
  ) {
    this.collectionId = data.collectionId ?? guid();
    this.activePageId = data.activePageId ?? guid();
    this.formGroup = this.formBuilder.group({
      collectionId: this.collectionId,
      firstPageId: this.activePageId,
      name: [data.name ?? '', Validators.required],
      groupId: data.groupId,
      drawGroupPolicy: data.drawGroupPolicy,
    }) as FormGroupTyped<DrawCollectionUpsertDTO>;
    this.formControlIsGroup = new FormControl(!!data.groupId);

    this.filteredOptions$ = this.formControlGroupFilter.valueChanges.pipe(
      startWith(''),
      switchMap(filter => this.testCreateDialogService.getFilteredGroups$(filter ?? '')),
    );

    if (data.groupId) {
      this.filteredOptions$.pipe(
        first(),
        map(groups => groups.find(g => g.value === data.groupId)),
      ).subscribe(group => {
        if (!group) {
          this.formControlIsGroup.patchValue(false);
          this.formGroup.controls.groupId.patchValue(null);
        } else {
          this.formControlGroupFilter.patchValue(group.key);
        }
      });
    }
  }

  save() {
    const value = {
      ...this.formGroup.value,
      groupId: this.formControlIsGroup.value ? this.formGroup.value.groupId : null,
    }
    this.drawSettingsService.upsertSettings$(value).subscribe(_ => {
      this.dialogRef.close();
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, this.activePageId]);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  selectGroup(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    this.formControlGroupFilter.patchValue(value.key);
    this.formGroup.controls.groupId.patchValue(value.value);
  }

  changeGroupConnect(checked: boolean) {
    if (checked) {
      this.formGroup.controls.groupId.addValidators(Validators.required);
      this.formGroup.controls.drawGroupPolicy.addValidators(Validators.required);
    } else {
      this.formGroup.controls.groupId.removeValidators(Validators.required);
      this.formGroup.controls.drawGroupPolicy.removeValidators(Validators.required);
    }
    this.formGroup.updateValueAndValidity();
  }
}