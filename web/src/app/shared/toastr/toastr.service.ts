import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastrService {
    constructor(public toastr: ToastsManager, private translate: TranslateService) {

    }

    showSuccess(messageKey) {
        this.toastr.success(this.translate.instant(messageKey), null);
    }

    showError(messageKey) {
        this.toastr.error(this.translate.instant(messageKey), null);
    }

    showWarning(messageKey) {
        this.toastr.warning(this.translate.instant(messageKey), null);
    }

    showInfo(messageKey) {
        this.toastr.info(this.translate.instant(messageKey));
    }

    showCustom(messageHtml) {
        this.toastr.custom(messageHtml, null); // null for not displaying title
    }
}
