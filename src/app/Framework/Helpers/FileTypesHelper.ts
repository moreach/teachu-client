export function imageTypes(): string {
    return 'image/png, image/jpeg, image/jpg';
}

export function commonTypes(): string {
    return 'image/png, image/jpeg, image/jpg,'
     + 'video/mp4, audio/mp3, '
     + 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,'
     + 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,'
     + 'application/vnd.openxmlformats-officedocument.presentationml.presentation,'
     + 'application/vnd.openxmlformats-officedocument.presentationml.slideshow,'
     + 'application/pdf';
}