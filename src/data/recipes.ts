export type Method =
  | "Espresso"
  | "V60"
  | "Chemex"
  | "French Press"
  | "Cold Brew"
  | "AeroPress"
  | "Moka Pot"
  | "Kalita Wave"
  | "Phin"
  | "Turkish";

export type Strength = "Light" | "Medium" | "Bold";

export interface Recipe {
  slug: string;
  name: string;
  method: Method;
  coffeeType: string;
  origin: string;
  roast: string;
  dose: number;
  water: number;
  tempC: number | null;
  timeLabel: string;
  ratio: string;
  strength: Strength;
  flavors: string[];
  description: string;
  steps: string[];
}

export const METHODS: Method[] = [
  "Espresso",
  "V60",
  "Chemex",
  "French Press",
  "Cold Brew",
  "AeroPress",
  "Moka Pot",
  "Kalita Wave",
  "Phin",
  "Turkish",
];

export const STRENGTHS: Strength[] = ["Light", "Medium", "Bold"];

export const FLAVOR_NOTES = [
  "Chocolate",
  "Citrus",
  "Floral",
  "Caramel",
  "Fruity",
  "Nutty",
  "Spiced",
  "Berry",
] as const;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stepsFor(m: Method, dose: number, water: number, tempC: number | null, timeLabel: string): string[] {
  const t = tempC == null ? "room-temperature" : `${tempC}°C`;
  switch (m) {
    case "V60":
      return [
        `Rinse the filter, add ${dose}g of medium-fine grounds, and level the bed.`,
        `Bloom with ${Math.round(dose * 2.5)}ml of ${t} water for 40 seconds, swirling gently.`,
        `Pour to ${Math.round(water * 0.6)}ml in slow spirals over 60 seconds.`,
        `Finish to ${water}ml; aim for a level bed and a total drawdown of ${timeLabel}.`,
      ];
    case "Chemex":
      return [
        `Rinse the thick filter well, add ${dose}g of medium-coarse grounds.`,
        `Bloom with ${Math.round(dose * 2.5)}ml of ${t} water for 45 seconds.`,
        `Pour in three slow pulses up to ${water}ml, keeping the bed saturated.`,
        `Total brew time should land near ${timeLabel}; the bed should look glossy, not muddy.`,
      ];
    case "French Press":
      return [
        `Add ${dose}g of coarse grounds to the press.`,
        `Pour all ${water}ml of ${t} water at once and start the timer.`,
        `At 4 minutes, break the crust and skim the foam.`,
        `Press gently and decant at ${timeLabel} to stop extraction.`,
      ];
    case "Cold Brew":
      return [
        `Combine ${dose}g of extra-coarse grounds with ${water >= 1000 ? `${water / 1000}L` : `${water}ml`} of room-temperature water.`,
        `Stir to saturate every pocket of coffee.`,
        `Cover and steep for ${timeLabel} at room temperature or in the fridge.`,
        `Filter through paper or a fine sieve; store chilled up to a week.`,
      ];
    case "AeroPress":
      return [
        `Add ${dose}g of medium-fine grounds to the AeroPress on the scale.`,
        `Pour ${water}ml of ${t} water and stir three times.`,
        `Cap, flip (or leave standard), and steep until ${timeLabel}.`,
        `Press with steady, even pressure — about 30 seconds.`,
      ];
    case "Espresso":
      return [
        `Dose ${dose}g of finely ground coffee and distribute evenly.`,
        `Tamp level with firm, straight pressure.`,
        `Lock in and extract to a ${water}g yield.`,
        `Target a total shot time of ${timeLabel} from pump start.`,
      ];
    case "Moka Pot":
      return [
        `Fill the base with ${t} water just below the valve.`,
        `Fill the basket with ${dose}g of medium-fine coffee — level, never tamped.`,
        `Brew on medium-low heat with the lid open.`,
        `Remove from heat at the first gurgle, around ${timeLabel}, and cool the base.`,
      ];
    case "Kalita Wave":
      return [
        `Rinse the filter, add ${dose}g of medium grounds, and flatten the bed.`,
        `Bloom with ${Math.round(dose * 2.5)}ml of ${t} water for 40 seconds.`,
        `Pour in gentle pulses to ${water}ml, keeping the water level low and even.`,
        `Drawdown should finish near ${timeLabel} with a flat bed.`,
      ];
    case "Phin":
      return [
        `Add ${dose}g of medium-coarse coffee to the phin and shake level.`,
        `Bloom with ${Math.round(dose * 2)}ml of ${t} water for 30 seconds.`,
        `Fill to ${water}ml and set the lid on top.`,
        `Drip should complete in about ${timeLabel}.`,
      ];
    case "Turkish":
      return [
        `Combine ${dose}g of powder-fine coffee, ${water}ml of cold water, and sugar to taste in the cezve.`,
        `Heat slowly, stirring until it dissolves, then stop stirring.`,
        `Remove from the heat just as the foam rises.`,
        `Rest ${timeLabel}, pour gently, and let the grounds settle.`,
      ];
  }
}

type Tuple = [string, Method, string, string, string, number, number, number | null, string, Strength, string[], string];

const T: Tuple[] = [
  // V60
  ["Morning Kettle", "V60", "Arabica", "Ethiopia Yirgacheffe", "Light", 18, 300, 94, "2:45", "Medium", ["Floral", "Citrus"], "Bright, layered, and easy to repeat. A single-origin V60 for the slow end of the morning."],
  ["Afternoon V60", "V60", "Arabica", "Guatemala Huehuetenango", "Medium-light", 15, 250, 92, "2:30", "Light", ["Citrus", "Caramel"], "Juicy, tea-like, and bright — a clean second cup."],
  ["Nairobi Dawn", "V60", "Arabica", "Kenya Nyeri", "Light", 20, 320, 95, "3:00", "Medium", ["Berry", "Citrus"], "Blackcurrant and grapefruit over a syrupy body."],
  ["Andes Window", "V60", "Arabica", "Colombia Huila", "Medium", 18, 280, 93, "2:40", "Medium", ["Caramel", "Chocolate"], "Rounded sweetness with a cocoa finish."],
  ["Monsoon Pour", "V60", "Blend", "India Monsooned Malabar", "Medium", 20, 300, 91, "2:50", "Bold", ["Spiced", "Nutty"], "Low acid, heavy body, warm spice."],
  ["First Light", "V60", "Arabica", "Rwanda Nyamasheke", "Light", 16, 260, 93, "2:35", "Light", ["Floral", "Fruity"], "Delicate florals with a stone-fruit heart."],
  ["Ember Cup", "V60", "Arabica", "Brazil Cerrado", "Medium-dark", 20, 300, 90, "2:50", "Bold", ["Chocolate", "Nutty"], "A darker V60 that drinks like comfort."],
  // Chemex
  ["Weekend Chemex", "Chemex", "Arabica", "Kenya AA", "Light", 24, 420, 95, "4:10", "Medium", ["Floral", "Berry"], "Big body, clean finish — worth the slower morning."],
  ["Long Table", "Chemex", "Arabica", "Ethiopia Sidamo", "Light", 30, 500, 94, "4:30", "Medium", ["Floral", "Citrus"], "A brew for two, floral and luminous."],
  ["Amber Hour", "Chemex", "Arabica", "Costa Rica Tarrazú", "Medium", 25, 400, 93, "4:00", "Medium", ["Caramel", "Citrus"], "Honeyed sweetness in a clear cup."],
  ["Slow Sunday", "Chemex", "Blend", "Guatemala + Colombia", "Medium", 28, 450, 92, "4:20", "Bold", ["Chocolate", "Caramel"], "A house blend built for the big carafe."],
  ["Cedar Room", "Chemex", "Arabica", "Sumatra Lintong", "Medium-dark", 26, 400, 91, "4:10", "Bold", ["Spiced", "Chocolate"], "Earthy, herbal, and deep."],
  ["Glasshouse", "Chemex", "Arabica", "Panama Boquete", "Light", 22, 380, 94, "3:50", "Light", ["Floral", "Fruity"], "Jasmine and peach, almost tea-like."],
  // French Press
  ["Sunday French Press", "French Press", "Arabica", "Colombia", "Medium", 30, 480, 96, "4:00", "Medium", ["Caramel", "Chocolate"], "Rounded, warm, forgiving."],
  ["Heavy Blanket", "French Press", "Blend", "Brazil + Sumatra", "Dark", 32, 480, 95, "4:00", "Bold", ["Chocolate", "Spiced"], "Full immersion at its heaviest and happiest."],
  ["Garden Press", "French Press", "Arabica", "Ethiopia Guji", "Light", 28, 450, 94, "4:00", "Light", ["Floral", "Berry"], "Proof that a press can keep its florals."],
  ["Kitchen Table", "French Press", "Arabica", "Peru Cajamarca", "Medium", 30, 500, 95, "4:30", "Medium", ["Nutty", "Caramel"], "An everyday press with a soft nutty core."],
  ["Dusk Press", "French Press", "Arabica", "Mexico Chiapas", "Medium-dark", 32, 500, 94, "4:00", "Bold", ["Chocolate", "Nutty"], "Decadent and low-key; good with milk."],
  ["River Bend", "French Press", "Arabica", "Honduras Marcala", "Medium", 28, 440, 95, "4:15", "Medium", ["Fruity", "Caramel"], "Plum and panela in a heavy cup."],
  // Cold Brew
  ["Overnight Cold Brew", "Cold Brew", "Arabica", "Sumatra", "Medium-dark", 70, 1000, null, "16h", "Bold", ["Chocolate", "Spiced"], "Slow, low-acid, syrupy."],
  ["Porch Pitcher", "Cold Brew", "Blend", "Brazil + Ethiopia", "Medium", 60, 900, null, "14h", "Medium", ["Chocolate", "Fruity"], "A balanced house cold brew for the fridge door."],
  ["Bright Ice", "Cold Brew", "Arabica", "Kenya", "Light", 65, 900, null, "18h", "Medium", ["Citrus", "Berry"], "Cold-steeped Kenyan that keeps its sparkle."],
  ["Concentrate No. 4", "Cold Brew", "Blend", "Colombia + Robusta", "Dark", 100, 800, null, "16h", "Bold", ["Chocolate", "Nutty"], "A 1:8 concentrate — cut with water or milk."],
  ["Melon & Dusk", "Cold Brew", "Arabica", "Ethiopia Yirgacheffe", "Light", 60, 900, null, "15h", "Light", ["Floral", "Fruity"], "Floral, juicy, dangerously drinkable over ice."],
  ["Midnight Shift", "Cold Brew", "Blend", "Vietnam Robusta blend", "Dark", 80, 1000, null, "18h", "Bold", ["Chocolate", "Spiced"], "Dark, thick, and built for long nights."],
  // AeroPress
  ["Competition Press", "AeroPress", "Arabica", "Ethiopia Yirgacheffe", "Light", 15, 220, 92, "1:45", "Light", ["Floral", "Citrus"], "Inverted, fast, and trophy-bright."],
  ["Desk Job", "AeroPress", "Arabica", "Colombia", "Medium", 14, 200, 85, "2:00", "Medium", ["Caramel", "Nutty"], "Forgiving office brew with lower water temperature."],
  ["Trail Cup", "AeroPress", "Blend", "Brazil blend", "Medium-dark", 16, 230, 88, "1:30", "Bold", ["Chocolate", "Nutty"], "Campsite-proof: coarse, quick, sturdy."],
  ["Espresso-Style 60", "AeroPress", "Arabica", "Guatemala Antigua", "Medium", 18, 60, 90, "0:45", "Bold", ["Chocolate", "Spiced"], "A concentrated press for milk drinks."],
  ["Slow Inversion", "AeroPress", "Arabica", "Kenya", "Light", 15, 240, 93, "2:30", "Medium", ["Berry", "Citrus"], "Longer steep, bigger berry."],
  ["Paper & Metal", "AeroPress", "Arabica", "Peru", "Medium", 15, 210, 90, "2:00", "Medium", ["Caramel", "Floral"], "Double-filtered clarity with a pressed body."],
  ["Night Cap", "AeroPress", "Arabica", "Decaf Colombia", "Medium", 14, 200, 88, "2:00", "Light", ["Chocolate", "Caramel"], "All the ritual, none of the jitters."],
  // Espresso
  ["House Pull", "Espresso", "Blend", "Brazil + Ethiopia", "Medium", 18, 36, 93, "0:28", "Medium", ["Chocolate", "Fruity"], "The balanced 1:2 house shot."],
  ["Ristretto No. 9", "Espresso", "Arabica", "Ethiopia Guji", "Light", 18, 27, 94, "0:25", "Bold", ["Berry", "Floral"], "Tight 1:1.5 ratio; intense and perfumed."],
  ["Lungo Light", "Espresso", "Arabica", "Costa Rica", "Medium-light", 17, 50, 92, "0:32", "Light", ["Citrus", "Caramel"], "A longer pull that stays sweet."],
  ["Napoli Dark", "Espresso", "Blend", "Robusta blend", "Dark", 16, 32, 91, "0:26", "Bold", ["Chocolate", "Spiced"], "Southern-Italian style: short, thick crema."],
  ["Single Origin Sunday", "Espresso", "Arabica", "Colombia Pink Bourbon", "Medium-light", 18, 38, 94, "0:29", "Medium", ["Fruity", "Caramel"], "A fruit-forward single origin under pressure."],
  ["Flat White Base", "Espresso", "Blend", "Brazil + Colombia", "Medium-dark", 19, 38, 93, "0:28", "Bold", ["Chocolate", "Nutty"], "Built to hold its own in milk."],
  ["Highland Shot", "Espresso", "Arabica", "Kenya AA", "Light", 18, 36, 95, "0:30", "Medium", ["Berry", "Citrus"], "Blackcurrant brightness in a tiny cup."],
  // Moka Pot
  ["Stovetop Standard", "Moka Pot", "Blend", "Brazil + Robusta", "Medium-dark", 20, 200, null, "5:00", "Bold", ["Chocolate", "Nutty"], "The classic kitchen moka, dense and bittersweet."],
  ["Nonna's Pot", "Moka Pot", "Blend", "Italian roast blend", "Dark", 18, 180, null, "4:30", "Bold", ["Chocolate", "Spiced"], "Old-school and unapologetic."],
  ["Moka Suave", "Moka Pot", "Arabica", "Colombia", "Medium", 20, 220, null, "5:00", "Medium", ["Caramel", "Fruity"], "Preheated water keeps it sweet, not scorched."],
  ["Havana Morning", "Moka Pot", "Blend", "Latin American blend", "Dark", 22, 200, null, "4:45", "Bold", ["Chocolate", "Caramel"], "Whip the first drops with sugar for espuma."],
  ["Alpine Moka", "Moka Pot", "Arabica", "Guatemala", "Medium", 19, 190, null, "5:00", "Medium", ["Nutty", "Spiced"], "A cabin brew with a cinnamon edge."],
  ["Soft Bitter", "Moka Pot", "Arabica", "Ethiopia Sidamo", "Medium-light", 20, 210, null, "4:50", "Medium", ["Fruity", "Chocolate"], "A lighter moka that keeps its fruit."],
  // Kalita Wave
  ["Flat Bed Friday", "Kalita Wave", "Arabica", "Colombia Huila", "Medium", 20, 320, 93, "3:00", "Medium", ["Caramel", "Chocolate"], "Even extraction, zero drama."],
  ["Wave Rider", "Kalita Wave", "Arabica", "Ethiopia Yirgacheffe", "Light", 18, 300, 94, "2:50", "Light", ["Floral", "Citrus"], "The flat bed flatters delicate lots."],
  ["Commuter Cup", "Kalita Wave", "Blend", "House blend", "Medium", 16, 260, 92, "2:40", "Medium", ["Nutty", "Caramel"], "Fast, repeatable, forgiving before work."],
  ["Deep Wave", "Kalita Wave", "Arabica", "Sumatra", "Medium-dark", 20, 300, 91, "3:10", "Bold", ["Spiced", "Chocolate"], "Heavy body through a paper filter."],
  ["Golden Hour", "Kalita Wave", "Arabica", "Panama", "Light", 18, 290, 94, "2:55", "Light", ["Floral", "Fruity"], "Honeyed florals at golden hour."],
  // Phin
  ["Saigon Street", "Phin", "Robusta", "Vietnam Đắk Lắk", "Dark", 20, 100, 96, "4:30", "Bold", ["Chocolate", "Nutty"], "Intense and slow; perfect over condensed milk."],
  ["Cà Phê Đá", "Phin", "Robusta", "Vietnam", "Dark", 22, 120, 95, "5:00", "Bold", ["Chocolate", "Caramel"], "Pour over a full glass of ice."],
  ["Phin Light", "Phin", "Arabica", "Vietnam Lâm Đồng", "Medium", 20, 140, 94, "4:00", "Medium", ["Fruity", "Caramel"], "A gentler phin from highland Arabica."],
  // Turkish
  ["Istanbul Classic", "Turkish", "Arabica", "Brazil + Ethiopia blend", "Medium", 7, 70, null, "2:00", "Bold", ["Spiced", "Chocolate"], "Unfiltered, foamed, and meant for conversation."],
  ["Cardamom Cup", "Turkish", "Arabica", "Yemen-style blend", "Medium-dark", 7, 70, null, "2:00", "Bold", ["Spiced", "Floral"], "A pinch of cardamom in the cezve."],
];

export const recipes: Recipe[] = T.map(
  ([name, method, coffeeType, origin, roast, dose, water, tempC, timeLabel, strength, flavors, description]) => {
    const ratio = `1:${(water / dose).toFixed(water / dose >= 20 ? 0 : 1)}`;
    return {
      slug: slugify(name),
      name,
      method,
      coffeeType,
      origin,
      roast,
      dose,
      water,
      tempC,
      timeLabel,
      ratio,
      strength,
      flavors,
      description,
      steps: stepsFor(method, dose, water, tempC, timeLabel),
    };
  },
);

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}
