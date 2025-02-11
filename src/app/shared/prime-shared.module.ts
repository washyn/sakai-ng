import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FieldsetModule} from "primeng/fieldset";
import {FileUploadModule} from "primeng/fileupload";
import {StyleClassModule} from "primeng/styleclass";

@NgModule({
    imports: [
        ButtonModule,
        AutoCompleteModule,
        DropdownModule,
        RadioButtonModule,
        TableModule,
        CheckboxModule,
        DialogModule,
        InputNumberModule,
        InputTextModule,
        CardModule,
        AvatarModule,
        ConfirmDialogModule,
        FieldsetModule,
        FileUploadModule,
        StyleClassModule,
    ],
    exports: [
        ButtonModule,
        AutoCompleteModule,
        DropdownModule,
        RadioButtonModule,
        TableModule,
        CheckboxModule,
        DialogModule,
        InputNumberModule,
        InputTextModule,
        CardModule,
        AvatarModule,
        ConfirmDialogModule,
        FieldsetModule,
        FileUploadModule,
        StyleClassModule,
    ]
})
export class PrimeSharedModule {}
