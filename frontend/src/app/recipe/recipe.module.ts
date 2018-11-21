import { NgModule } from '@angular/core';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { EditRecipeFormComponent } from './elements/edit-recipe-form/edit-recipe-form.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RecipeRoutingModule } from './recipe-routing.module.';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeCreateComponent,
    EditRecipeFormComponent,
    RecipeEditComponent
  ],
  imports: [SharedModule, RecipeRoutingModule, TranslateModule]
})
export class RecipeModule {}
