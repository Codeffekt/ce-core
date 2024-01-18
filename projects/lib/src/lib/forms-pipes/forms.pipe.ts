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

@Pipe({ name: 'valueForKey' })
export class FormsValueForKeyPipe implements PipeTransform {

  transform(formInstance: FormInstanceExt, field: string): any {

    if (!formInstance) {
      return null;
    }

    const elts = field.split(".").reverse();

    if (elts.length > 1 && formInstance.fields) {
      let curInstance: FormInstanceExt | undefined = formInstance;
      while (elts.length > 1) {
        const curField = elts.pop();
        curInstance = formInstance.fields[curField] as FormInstanceExt;
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

@Pipe({ name: 'formWithId' })
export class FormsWithIdPipe implements PipeTransform {

  transform(formInstance: FormInstanceExt, formId: string): any {
    if (!formInstance) {
      return null;
    }

    return formInstance.forms?.find(form => form.id === formId);
  }
}

@Pipe({ name: 'getInstance' })
export class FormsGetInstance implements PipeTransform {

  transform(formWrapper: FormWrapper<any>, field: string): FormInstance | undefined {

    if (!formWrapper) {
      return undefined;
    }

    return formWrapper.getInstanceFromField(field);
  }

}

@Pipe({ name: 'getReferenceName' })
export class FormsGetReferenceName implements PipeTransform {
  transform(formWrapper: FormWrapper<any>, field?: string): string | undefined {

    if (!formWrapper) {
      return undefined;
    }

    return (field && formWrapper.props[field]) ? formWrapper.props[field]
      : formWrapper.core.id;
  }
}

@Pipe({ name: 'formChange' })
export class FormsChangeFieldPipe<T = FormWrapper> implements PipeTransform {

  transform(notifier$: Observable<FormWrapperChangeNotifier<FormWrapper>>, field?: keyof T): Observable<FormWrapper<T>> {
    return notifier$.pipe(
      filter(notifier => notifier.needsAllUpdate || (field && (<any>notifier.needsUpdate)[field])),
      map(notifier => notifier.wrapper.weakClone())
    );
  }

}

@Pipe({ name: 'formTitle' })
export class FormTitlePipe<T> implements PipeTransform {

  transform(formWrapper: FormWrapper<T>): string {
    return formWrapper.getFormTitle();
  }
}

@Pipe({ name: 'formAuthor' })
export class FormsAuthorPipe implements PipeTransform {

  transform(wrapper: FormWrapper): string {

    if (!wrapper || !wrapper.author) {
      return "-";
    }

    return (!wrapper.author.firstName && !wrapper.author.lastName) ? 
      wrapper.author.login : `${wrapper.author.firstName} ${wrapper.author.lastName}`;
  }

}

@Pipe({ name: 'formInstanceTitle' })
export class FormInstanceTitlePipe<T> implements PipeTransform {

  transform(form: FormInstance): string {
    return form.title;
  }
}

@Pipe({ name: 'formInstanceCreation' })
export class FormInstanceCreationPipe<T> implements PipeTransform {

  transform(form: FormInstance): string {
    return Utils.getCalendarDate(form.ctime)
  }
}

@Pipe({ name: 'formInstanceModif' })
export class FormInstanceModificationPipe<T> implements PipeTransform {

  transform(form: FormInstance): string {
    return form.mtime ? Utils.getCalendarDate(form.mtime) : '-';
  }
}

@Pipe({ name: 'formBlocks' })
export class FormBlocksPipe<T> implements PipeTransform {
  transform(formWrapper: FormWrapper<T>): FormBlock[] {
    return FormUtils.getBlocks((<FormInstance>(formWrapper.core)));
  }
}

@Pipe({ name: 'formInstanceBlocks' })
export class FormInstanceBlocks<T> implements PipeTransform {
  constructor() { }

  transform(form: FormInstance | FormBlock[], formStyle?: FormInstanceMaskWrapper): FormBlock[] {
    // return FormUtils.getBlocks((<FormInstance>(form)));
    return new FormStyleBuilder().buildBlocks(form, formStyle);
  }
}

@Pipe({ name: 'formBlockValue' })
export class FormBlockValuePipe implements PipeTransform {
  transform(formBlock: FormBlock): string {
    return getBlockValue(formBlock);
  }
}

const ALLOWED_META_FIELDS = ['root', 'title', 'id', 'ctime', 'mtime', 'author', 'valid', 'table'];

function retrieveBlockFromField(formInstance: FormInstanceExt, field: string): FormBlock {
  if (field.startsWith('$')) {
    const metaField = field.slice(1);
    return ALLOWED_META_FIELDS.includes(metaField) ?
      { value: formInstance[metaField], type: "text", field: metaField } :
      { value: "-", type: "text", field: metaField };
  } else if (field.startsWith('#')) {
    const aggField = `agg_${field.slice(1)}`;
    return formInstance.fields ? { value: (<any>formInstance).fields[aggField], type: "text", field } :
      { value: "-", type: "text", field };
  }
  const elts = field.split(".", 2);
  const formBlock = elts.length === 1 ? formInstance.content[elts[0]] :
    FormUtils.getFormField(elts[0], formInstance)?.content[elts[1]];
  return formBlock;
}

@Pipe({ name: 'formInstanceType' })
export class FormInstanceTypePipe implements PipeTransform {
  transform(formInstance: FormInstance, field: string): string {
    const formBlock = retrieveBlockFromField(formInstance, field);
    return formBlock?.type;
  }
}

@Pipe({ name: 'formInstanceBlock' })
export class FormInstanceBlockPipe implements PipeTransform {
  transform(formInstance: FormInstance, field: string): FormBlock {
    return retrieveBlockFromField(formInstance, field);
  }
}
@Pipe({ name: 'formInstanceValue' })
export class FormInstanceValuePipe implements PipeTransform {
  transform(formInstance: FormInstanceExt, field: string): string {
    const formBlock = retrieveBlockFromField(formInstance, field);
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

@Pipe({ name: 'formWrapperBuild' })
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

@Pipe({ name: 'formWrapperChange' })
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

