import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';

@Component({
  selector: 'app-recipe-tile',
  animations: [Animations.fadeInAndOut],
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeTileComponent implements OnInit {
  @Input()
  recipe: RecipeDTO;

  imageLoaded: boolean = false;

  constructor() {}

  ngOnInit() {}

  setImageLoaded(): void {
    this.imageLoaded = true;
  }
}
