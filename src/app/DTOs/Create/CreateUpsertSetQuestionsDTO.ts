import { CreateQuestionDistributeDTO } from "./CreateQuestionDistributeDTO";
import { CreateQuestionMathematicDTO } from "./CreateQuestionMathematicDTO";
import { CreateQuestionMultipleChoiceDTO } from "./CreateQuestionMultipleChoiceDTO";
import { CreateQuestionOpenQuestionDTO } from "./CreateQuestionOpenQuestionDTO";
import { CreateQuestionTextFieldDTO } from "./CreateQuestionTextFieldDTO";
import { CreateQuestionTrueFalseDTO } from "./CreateQuestionTrueFalseDTO";
import { CreateQuestionWordDTO } from "./CreateQuestionWordDTO";

export interface CreateUpsertSetQuestionsDTO {
    setId: string;
    questionsDistribute: CreateQuestionDistributeDTO[];
    questionsMathematic: CreateQuestionMathematicDTO[];
    questionsMultipleChoice: CreateQuestionMultipleChoiceDTO[];
    questionsOpenQuestion: CreateQuestionOpenQuestionDTO[];
    questionsTextField: CreateQuestionTextFieldDTO[];
    questionsTrueFalse: CreateQuestionTrueFalseDTO[];
    questionsWord: CreateQuestionWordDTO[];
}