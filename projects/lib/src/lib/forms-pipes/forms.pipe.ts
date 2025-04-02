import { Pipe, PipeTransform } from "@angular/core";
import {
  BarCode, FormBlock,
  FormInstance, FormInstanceExt,
  FormInstanceMaskWrapper,
  FormUtils, FormWrapper
} from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { FormStyleBuilder } from "../forms/form/form-style.builder";
import { FormWrapperChangeNotifier } from "../models/FormWrapperChangeNotifier";
import { Utils } from "../utils/Utils";

@Pipe({
  name: 'valueForKey',
  standalone: false
})
export class FormsValueForKeyPipe implements PipeTransform {

  transform(formInstance: FormInstance | FormInstanceExt | undefined, field: string): any {

    if (!formInstance) {
      return null;
    }

    const elts = field.split(".").reverse();

    if (elts.length > 1 && FormUtils.isFormInstanceExt(formInstance) && formInstance.fields) {
      let curInstance: FormInstanceExt | undefined = formInstance;
      while (elts.length > 1) {
        const curField = elts.pop();
        curInstance = formInstance.fields[curField!] as FormInstanceExt;
        if (!curInstance) {
          return null;
        }
      }
      const formBlock = FormUtils.getBlockFromField(curInstance, elts[0]);
      return (formBlock ? formBlock.value : null);
    } else {
      const formBlock = FormUtils.getBlockFromField(formInstance, field);
      return (formBlock ? formBlock.value : null);
    }

  }
}

@Pipe({
  name: 'formWithId',
  standalone: false
})
export class FormsWithIdPipe implements PipeTransform {

  transform(formInstance: FormInstanceExt, formId: string): any {
    if (!formInstance) {
      return null;
    }

    return formInstance.forms?.find(form => form.id === formId);
  }
}

@Pipe({
  name: 'getInstance',
  standalone: false
})
export class FormsGetInstance implements PipeTransform {

  transform(formWrapper: FormWrapper, field: string): FormInstance | undefined {

    if (!formWrapper) {
      return undefined;
    }

    return formWrapper.getInstanceFromField(field);
  }

}

@Pipe({
  name: 'getInstanceNode',
  standalone: false
})
export class FormsGetInstanceNode implements PipeTransform {

  transform(formWrapper: FormWrapper, field: string): FormInstance | undefined {

    if (!formWrapper) {
      return undefined;
    }

    return formWrapper.getInstanceFromNode(field);
  }

}

@Pipe({
  name: 'getReferenceName',
  standalone: false
})
export class FormsGetReferenceName implements PipeTransform {
  transform(formWrapper: FormWrapper<any>, field?: string): string | undefined {

    if (!formWrapper) {
      return undefined;
    }

    return (field && formWrapper.props[field]) ? formWrapper.props[field]
      : formWrapper.core.id;
  }
}

@Pipe({
  name: 'formChange',
  standalone: false
})
export class FormsChangeFieldPipe<T = FormWrapper> implements PipeTransform {

  transform(notifier$: Observable<FormWrapperChangeNotifier<FormWrapper>>, field?: keyof T): Observable<FormWrapper<T>> {
    return notifier$.pipe(
      filter(notifier => notifier.needsAllUpdate || (field && (<any>notifier.needsUpdate)[field])),
      map(notifier => notifier.wrapper.weakClone())
    );
  }

}

@Pipe({
  name: 'formTitle',
  standalone: false
})
export class FormTitlePipe<T> implements PipeTransform {

  transform(formWrapper: FormWrapper<T>): string {
    return formWrapper.getFormTitle();
  }
}

@Pipe({
  name: 'formAuthor',
  standalone: false
})
export class FormsAuthorPipe implements PipeTransform {

  transform(wrapper: FormWrapper): string {

    if (!wrapper || !wrapper.author) {
      return "-";
    }

    return (!wrapper.author.firstName && !wrapper.author.lastName) ?
      wrapper.author.login : `${wrapper.author.firstName} ${wrapper.author.lastName}`;
  }

}

@Pipe({
  name: 'formInstanceTitle',
  standalone: false
})
export class FormInstanceTitlePipe<T> implements PipeTransform {

  transform(form: FormInstance): string {
    return form.title;
  }
}

@Pipe({
  name: 'formInstanceCreation',
  standalone: false
})
export class FormInstanceCreationPipe<T> implements PipeTransform {

  transform(form: FormInstance): string {
    return Utils.getCalendarDate(form.ctime)
  }
}

@Pipe({
  name: 'formInstanceModif',
  standalone: false
})
export class FormInstanceModificationPipe<T> implements PipeTransform {

  transform(form: FormInstance): string {
    return form.mtime ? Utils.getCalendarDate(form.mtime) : '-';
  }
}

@Pipe({
  name: 'formBlocks',
  standalone: false
})
export class FormBlocksPipe<T> implements PipeTransform {
  transform(formWrapper: FormWrapper<T>): FormBlock[] {
    return FormUtils.getBlocks((<FormInstance>(formWrapper.core)));
  }
}

@Pipe({
  name: 'formInstanceBlocks',
  standalone: false
})
export class FormInstanceBlocks<T> implements PipeTransform {
  constructor() { }

  transform(form: FormInstance | FormBlock[], formStyle?: FormInstanceMaskWrapper): FormBlock[] {
    // return FormUtils.getBlocks((<FormInstance>(form)));
    return new FormStyleBuilder().buildBlocks(form, formStyle);
  }
}

@Pipe({
  name: 'formBlockValue',
  standalone: false
})
export class FormBlockValuePipe implements PipeTransform {
  transform(formBlock: FormBlock): string {
    return getBlockValue(formBlock);
  }
}

@Pipe({
  name: 'formInstanceType',
  standalone: false
})
export class FormInstanceTypePipe implements PipeTransform {
  transform(formInstance: FormInstance, field: string): string {
    const formBlock = FormUtils.retrieveBlockFromField(formInstance, field);
    return formBlock?.type as any;
  }
}

@Pipe({
  name: 'formInstanceBlock',
  standalone: false
})
export class FormInstanceBlockPipe implements PipeTransform {
  transform(formInstance: FormInstance, field: string): FormBlock {
    return FormUtils.retrieveBlockFromField(formInstance, field);
  }
}
@Pipe({
  name: 'formInstanceValue',
  standalone: false
})
export class FormInstanceValuePipe implements PipeTransform {
  transform(formInstance: FormInstanceExt, field: string): string | undefined {
    const formBlock = FormUtils.retrieveBlockFromField(formInstance, field);
    return formBlock ? getBlockValue(formBlock) : undefined;
  }
}

function getBlockValue(formBlock: FormBlock) {
  switch (formBlock.type) {
    case "barcode":
      const barcode: BarCode = formBlock?.value;
      return barcode?.text;
    default:
      return formBlock.value;
  }
}

@Pipe({
  name: 'formWrapperBuild',
  standalone: false
})
export class FormWrapperBuildPipe implements PipeTransform {
  transform(wrapper: FormWrapper, field?: string): FormWrapper {
    if (field) {
      const form = wrapper.getInstanceFromField(field);
      return new FormWrapper(
        FormWrapper.createProps(form),
        form
      );
    } else {
      return wrapper.weakClone();
    }
  }
}

@Pipe({
  name: 'formWrapperChange',
  standalone: false
})
export class FormWrapperChangeFieldPipe implements PipeTransform {

  transform<T>(notifier$: Observable<FormWrapperChangeNotifier<any>>, field?: string): Observable<FormWrapper<any>> {
    return FormWrapperChangeFieldPipe.filter(notifier$, field);
  }

  static filter(notifier$: Observable<FormWrapperChangeNotifier<any>>, field?: string): Observable<FormWrapper<any>> {
    return notifier$.pipe(
      filter(notifier => notifier.needsAllUpdate || (field && (<any>notifier.needsUpdate)[field])),
      map(notifier => notifier.wrapper.weakClone())
    );
  }
}

