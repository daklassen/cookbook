package de.david.cookbook;

import de.david.cookbook.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class CookBookApplication implements CommandLineRunner {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private RecipeRepository recipeRepository;

	@Autowired
	private IngredientRepository ingredientRepository;

	@Autowired
	private UserRepository userRepository;

	// TODO: remove temporary content filling on startup
	@Override
	public void run(String... args) throws Exception {
		Category hauptgericht = new Category("Hauptgericht");
		Category vorspeise = new Category("Vorspeise");
		Category nachspeise = new Category("Nachspeise");
		categoryRepository.save(hauptgericht);
		categoryRepository.save(vorspeise);
		categoryRepository.save(nachspeise);

		User david = new User("David", "Klassen", "daviddd.kl@gmail.com", "4e34b20f-ec21-45b1-98fe-f7b79980e320");
		userRepository.save(david);

		Ingredient teig = new Ingredient(200, "g", "Blätterteig");
		Ingredient lachs = new Ingredient(450, "g", "Lachs");
		Ingredient sahne = new Ingredient(200, "ml", "Schlagsahne");
		Ingredient eier = new Ingredient(3, "", "Eier");
		Ingredient salz = new Ingredient(0, "", "Salz, Pfeffer");
		ArrayList<Ingredient> ingredients = new ArrayList<>();
		ingredientRepository.save(teig);
		ingredientRepository.save(lachs);
		ingredientRepository.save(sahne);
		ingredientRepository.save(eier);
		ingredientRepository.save(salz);
		ingredients.add(teig);
		ingredients.add(lachs);
		ingredients.add(sahne);
		ingredients.add(eier);
		ingredients.add(salz);

		List<Recipe> recipes = new ArrayList<>();

		String description = "Eine Quicheform mit dem Blätterteig auskleiden (die Form vorher entweder mit dem mitgelieferten Backpapier auskleiden oder ausfetten).\n" +
				"Den Ziegenfrischkäse mit Meerrettich verrühren und den Blätterteigboden damit schön gleichmäßig bestreichen. Den Räucherlachs in lockeren Schleifen darauf verteilen. Die Krabben dazwischen streuen. Sahne und Eier verrühren, abschmecken und den gehackten Dill untermischen. Die Sahnemischung gleichmäßig auf den belegten Teig gießen und die Quiche im vorgeheizten Ofen bei 250 °C ca. 30 Min. backen.\n" +
				"Alternativ zum Ziegenfrischkäse kann man die Quiche auch mit einem Meerrettichfrischkäse oder einem Kräuterfrischkäse zubereiten, dann aber die weicheren Sorten (z. B. Bresso) verwenden. Statt Dill kann man auch Basilikum nehmen.";

		recipes.add(new Recipe("Bohneneintopf", david, "https://image.ibb.co/hpQUy7/food_3.png", 4, description, hauptgericht, ingredients));
		recipes.add(new Recipe("Chili", david, "https://preview.ibb.co/bBThJ7/food_1.png", 4, description, hauptgericht, null));
		recipes.add(new Recipe("Paprika-Auflauf2", david, "https://image.ibb.co/hxD4WS/food_2.png", 4, description, vorspeise, null));
		recipes.add(new Recipe("Chili2", david, "https://preview.ibb.co/bBThJ7/food_1.png", 4, description, hauptgericht, null));

		recipes.forEach(recipe -> recipeRepository.save(recipe));
	}

	public static void main(String[] args) {
		SpringApplication.run(CookBookApplication.class, args);
	}
}
