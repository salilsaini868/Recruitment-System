import {NgModule} from '@angular/core';
import { ApiClientService } from '../services/swagger-generated/apiClientService';
import {ExampleService} from './example.service';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [],
  providers: [
    ExampleService, ApiClientService

  ],
})
export class ServiceModule {
}
