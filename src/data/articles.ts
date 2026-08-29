import kettleImg from "@/assets/journal-kettle.jpg";
import beansImg from "@/assets/journal-beans.jpg";
import farmImg from "@/assets/journal-farm.jpg";
import cuppingImg from "@/assets/journal-cupping.jpg";

export type ArticleCategory = "History" | "Brewing Science" | "Regions & Farms";

export interface Citation {
  label: string;
  source: string;
}

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  dateLabel: string;
  readTime: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  citations: Citation[];
}

export const articles: Article[] = [
  {
    slug: "why-the-last-40ml-matter",
    title: "Why the last 40ml matter",
    category: "Brewing Science",
    excerpt: "Grind, dose, and the quiet moments between pours.",
    dateLabel: "Season 04 · Vol. 12",
    readTime: "6 min",
    image: kettleImg,
    imageAlt: "Gooseneck kettle pouring into a ceramic V60 dripper",
    paragraphs: [
      "Every pour-over recipe ends with a final pour that feels almost ceremonial. It is easy to treat those last 40ml as a formality — the cup is mostly brewed, the scale is nearly at target. But the end of the brew is where extraction balance is decided.",
      "Extraction is not linear. The first fraction of water dissolves the most soluble compounds: bright acids and fruit-forward aromatics. The middle fraction carries sweetness. The final fraction pulls the heavier, slower-dissolving compounds — some of which add structure and bitterness.",
      "When a cup tastes hollow or sour, the last pour often went too fast: the water channelled through instead of percolating evenly, under-extracting the bed. When it tastes drying, the final pour lingered too long on an already-depleted bed.",
      "The fix is mechanical. Keep the last pour low and slow, pour over the dark spots in the bed, and let the drawdown finish on its own. A flat, even bed at the end is the visible signature of an even extraction.",
      "Measure the last 40ml the way you measure the bloom. The number on the scale settles, and so does the cup.",
    ],
    citations: [
      { label: "The Physics of Filter Coffee", source: "Jonathan Gagné, 2021" },
      { label: "Coffee Extraction: kinetics and equilibrium", source: "Moroney et al., Chemical Engineering Science, 2015" },
      { label: "Water for Coffee", source: "Maxwell Colonna-Dashwood & Christopher Hendon, 2015" },
    ],
  },
  {
    slug: "a-farm-in-yirgacheffe",
    title: "A farm in Yirgacheffe",
    category: "Regions & Farms",
    excerpt: "Shade-grown, small lot, and a short story.",
    dateLabel: "Season 04 · Vol. 11",
    readTime: "8 min",
    image: farmImg,
    imageAlt: "Coffee farm on the green hills of Yirgacheffe, Ethiopia",
    paragraphs: [
      "Yirgacheffe is less a single farm than a patchwork — thousands of smallholders, most with fewer than two hectares, delivering cherry to shared washing stations. The coffees that carry the name are the sum of those small lots.",
      "The region sits between 1,700 and 2,200 meters. At that altitude, cherries ripen slowly, and slow ripening concentrates the sugars and acids that washed Yirgacheffe is famous for: jasmine, bergamot, lemon.",
      "Most farms here are 'garden coffee' — coffee grown among other crops, under shade, picked by hand. Heirloom varieties, many of them uncatalogued, grow side by side.",
      "When you buy a Yirgacheffe lot, the washing station matters as much as the altitude. Stations that pay premiums for ripe cherry and dry slowly on raised beds produce the clean, floral cups the region is known for.",
    ],
    citations: [
      { label: "Ethiopian Coffee Buying Guide", source: "Boot Coffee Campus" },
      { label: "The State of Ethiopia's Coffee Sector", source: "USDA Foreign Agricultural Service, 2023" },
    ],
  },
  {
    slug: "extraction-a-working-model",
    title: "Extraction: a working model",
    category: "Brewing Science",
    excerpt: "What 18–22% actually means at the brew bar.",
    dateLabel: "Season 04 · Vol. 10",
    readTime: "9 min",
    image: cuppingImg,
    imageAlt: "Coffee cupping table with rows of tasting bowls and spoons",
    paragraphs: [
      "Extraction yield is the percentage of the dry coffee mass that ends up dissolved in your cup. The classic target window, 18–22%, comes from mid-century brewing research and still holds up as a practical frame.",
      "Under-extracted coffee — below 18% — tends toward sourness and a short, salty finish, because the quick-dissolving acids arrive first and the sugars never catch up. Over-extracted coffee drags bitter, drying compounds into the cup.",
      "You steer extraction with four levers: grind size, water temperature, contact time, and agitation. Change one at a time. Grind finer to raise extraction; pour gentler to lower it.",
      "Strength and extraction are different axes. Strength is concentration — how much dissolved material per gram of water. You can have a strong, under-extracted cup and a weak, perfectly extracted one. Taste before you adjust.",
    ],
    citations: [
      { label: "E.E. Lockhart, 'The Soluble Solids in Beverage Coffee'", source: "Coffee Brewing Center, 1957" },
      { label: "The Coffee Brewing Control Chart", source: "Specialty Coffee Association" },
      { label: "The Physics of Filter Coffee", source: "Jonathan Gagné, 2021" },
    ],
  },
  {
    slug: "how-coffee-left-ethiopia",
    title: "How coffee left Ethiopia",
    category: "History",
    excerpt: "From highland forests to Sufi monasteries to the world's ports.",
    dateLabel: "Season 03 · Vol. 09",
    readTime: "10 min",
    image: beansImg,
    imageAlt: "Weathered wooden crate of raw green coffee beans",
    paragraphs: [
      "Coffee's wild home is the montane forest of southwestern Ethiopia, where Coffea arabica still grows under canopy. How it became a cultivated drink is a story of trade across the Red Sea.",
      "By the 15th century, Sufi communities in Yemen were brewing coffee to stay awake through night devotions. The port of Mocha became the first great coffee entrepôt, and Yemen guarded its monopoly fiercely — beans were boiled or parched before export so they could not be planted.",
      "The monopoly broke in the 1600s. Pilgrims and traders carried viable seeds to India, and Dutch merchants moved plants to Java. Within two centuries coffee was planted across three continents.",
      "Every bag of Arabica on a shelf today descends from that narrow genetic corridor out of Ethiopia — which is why the forests of Kafa matter to everyone who drinks coffee.",
    ],
    citations: [
      { label: "Uncommon Grounds", source: "Mark Pendergrast, 1999" },
      { label: "Coffee: A Global History", source: "Jonathan Morris, 2019" },
      { label: "The World Atlas of Coffee", source: "James Hoffmann, 2018" },
    ],
  },
  {
    slug: "grind-size-is-a-budget",
    title: "Grind size is a budget",
    category: "Brewing Science",
    excerpt: "Surface area, fines, and why your grinder is the most important tool you own.",
    dateLabel: "Season 03 · Vol. 08",
    readTime: "7 min",
    image: kettleImg,
    imageAlt: "Kettle pouring over fresh coffee grounds",
    paragraphs: [
      "Grinding spends a budget: the smaller the particle, the more surface area you expose, and the faster water can dissolve what's inside. Extraction speed is the currency.",
      "Every grinder produces a distribution, not a single size. Fines — the dust at the small end — extract almost instantly and can clog a filter bed, slowing drawdown and adding bitterness.",
      "This is why burr quality shows up in the cup before almost any other upgrade. A tighter particle distribution means the sweet compounds extract together instead of racing the bitter ones.",
      "When a brew stalls, don't just blame the pour. Look at the grinder first.",
    ],
    citations: [
      { label: "The Effect of Bean Origin and Temperature on Grinding Roasted Coffee", source: "Uman et al., Scientific Reports, 2016" },
      { label: "Espresso Coffee: The Science of Quality", source: "Andrea Illy & Rinantonio Viani (eds.), 2005" },
    ],
  },
  {
    slug: "the-boston-tea-party-made-coffee-american",
    title: "The tea party that made coffee American",
    category: "History",
    excerpt: "How a tax protest quietly changed a continent's morning drink.",
    dateLabel: "Season 03 · Vol. 07",
    readTime: "6 min",
    image: beansImg,
    imageAlt: "Raw green coffee beans in a wooden crate",
    paragraphs: [
      "Colonial America drank tea, like Britain did. Coffee existed, but it was the drink of taverns and merchants, not kitchens.",
      "After 1773, tea became politically suspect. Drinking coffee turned into a small patriotic act, and imports climbed steadily through the early republic.",
      "The real shift came with industrial roasting and rail distribution in the 19th century — and with the Civil War, where coffee was issued to Union soldiers as a standard ration.",
      "By the 20th century, the United States was the largest coffee market in the world. It still is.",
    ],
    citations: [
      { label: "Uncommon Grounds", source: "Mark Pendergrast, 1999" },
      { label: "Coffee in American History", source: "Smithsonian Libraries" },
    ],
  },
  {
    slug: "sumatra-wet-hulled-and-proud",
    title: "Sumatra: wet-hulled and proud",
    category: "Regions & Farms",
    excerpt: "Giling basah — the process behind coffee's most divisive cup.",
    dateLabel: "Season 02 · Vol. 06",
    readTime: "7 min",
    image: farmImg,
    imageAlt: "Coffee drying beds on an Indonesian farm",
    paragraphs: [
      "Most of the world dries coffee in its parchment before hulling. Sumatra does the opposite: wet-hulling, or giling basah, removes the parchment while the bean is still swollen with moisture.",
      "The practice is a response to the climate — humid air that never lets coffee dry on the tree or the patio. Hulling early lets the bean finish drying exposed.",
      "The cup signature is unmistakable: heavy body, low acidity, notes of cedar, earth, and dark spice. Drinkers tend to love it or leave it.",
      "In a pour-over it can taste muddled; in a French press or cold brew, that weight becomes the whole point.",
    ],
    citations: [
      { label: "The World Atlas of Coffee", source: "James Hoffmann, 2018" },
      { label: "Processing Coffee in Indonesia", source: "Daily Coffee News, Roast Magazine" },
    ],
  },
  {
    slug: "the-coffeehouses-of-london",
    title: "The coffeehouses of London",
    category: "History",
    excerpt: "Penny universities, stock exchanges, and the birth of the café.",
    dateLabel: "Season 02 · Vol. 05",
    readTime: "8 min",
    image: cuppingImg,
    imageAlt: "A long wooden table set for coffee tasting",
    paragraphs: [
      "London's first coffeehouse opened in 1652. For a penny admission, anyone could sit, drink, and argue — which is why contemporaries called them 'penny universities'.",
      "Each trade had its house. Merchants met at Jonathan's; shipowners and underwriters at Edward Lloyd's, which became Lloyd's of London. The London Stock Exchange traces its lineage to a coffeehouse too.",
      "Charles II tried to shut them down in 1675, worried about sedition brewed alongside the coffee. The proclamation collapsed within days.",
      "The template survived: a public table, a stimulant, and conversation. Every specialty café is its descendant.",
    ],
    citations: [
      { label: "The Social Life of Coffee", source: "Brian Cowan, 2005" },
      { label: "London Coffee Houses", source: "Museum of London" },
    ],
  },
  {
    slug: "colombia-a-thousand-microclimates",
    title: "Colombia: a thousand microclimates",
    category: "Regions & Farms",
    excerpt: "Why Huila, Nariño, and Cauca taste nothing alike.",
    dateLabel: "Season 02 · Vol. 04",
    readTime: "7 min",
    image: farmImg,
    imageAlt: "Steep green coffee hillsides in Colombia",
    paragraphs: [
      "Colombia's coffee grows on the spine of the Andes, where altitude, aspect, and two harvest seasons create a country of microclimates.",
      "Huila, in the south, produces washed coffees with caramel sweetness and red fruit — the profile many drinkers now think of as 'classic specialty'. Nariño, higher and colder, pushes toward citrus and florals.",
      "Smallholders dominate: the average farm is under five hectares, and the Federación Nacional de Cafeteros built the infrastructure — buying points, extension, the Juan Valdez mark — that lets tiny lots reach export.",
      "When you see a Colombian micro-lot on a menu, you're tasting one hillside, one harvest window, one family's mill.",
    ],
    citations: [
      { label: "Federación Nacional de Cafeteros", source: "federaciondecafeteros.org" },
      { label: "The World Atlas of Coffee", source: "James Hoffmann, 2018" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
