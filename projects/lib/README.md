# CE-CORE

Provides Angular core services, components, pipes and many others utilities facilitating web applications development of key features such as:

 - Authentification process
 - Forms
 - Smart tables (sort, filter, search)

# Using CE-CORE

1. Install required tools:

    ```sh
    npm install --save @codeffekt/ce-core
    ```
    
    ce-core relies on Angular Material and Boostrap:

    ```sh
    npm install --save @angular/material
    npm install --save boostrap
    ```

2. Add CeCoreModule into your app.module.ts file:

      ```typescript
      ...
      import { CeCoreModule } from '@codeffekt/ce-core';
      ...

      const myConfig: CeCoreModuleConfig = {
        api_url: 'my-api-url'
      };

      @NgModule({
        imports: [
          ...
          CeCoreModule.forRoot(myConfig)
        ],
        ...
        bootstrap: [AppComponent]
      })
      export class AppModule { }
      ```

3. Add ce-core theme to your main scss file

    ```scss
    @import '@codeffekt/ce-core/assets/theme/ce-core
    ```

    or add it to angular.json:
    ```json
    "styles": ["@codeffekt/ce-core/assets/theme/ce-core.scss"],
    ```
 
# Library structure

Ce-core is splitted into Angular core concepts:

```
src/                        source code
|- auth/                    provide auth support utilies
|- forms/                   provide form widgets
+- ...                    
```
```
 