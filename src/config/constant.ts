import { dateFormater } from '@/helpers/dateFormater'

// Replace with your own client ID (this is a test client ID from Enzo's account)
export const GOOGLE_CLIENT_ID =
  '531767569977-p791pp677m3j5h2sto6m9fqb91lat0qi.apps.googleusercontent.com'

export const MEAL_TYPES = [
  {
    id: 0,
    name: 'Entrée',
  },
  {
    id: 1,
    name: 'Plat',
  },
  {
    id: 2,
    name: 'Déssert',
  },
]
export const FAKE_RECIPE = [
  {
    title: 'Croissant',
    type: 0,
    ingredients: [
      { name: 'sel', quantity: 10, weight: 'g' },
      { name: 'levure de boulanger', quantity: 15, weight: 'g' },
      { name: 'farine type 45', quantity: 500, weight: 'g' },
      { name: 'eau', quantity: 2, weight: 'cuillères à soupe' },
      { name: 'sucre', quantity: 50, weight: 'g' },
      { name: 'beurre tendre', quantity: 180, weight: 'g' },
      { name: 'lait', quantity: 28, weight: 'cl' },
      { name: 'oeuf', quantity: 1, weight: 'pcs' },
    ],
    recipe: [
      'Première étape : la pâte feuilletée levée.',
      "Délayer la levure dans l'eau tiède. Dans un grand saladier, déposer la farine, le sel, le sucre, creuser un puits et incorporer petit à petit le lait.",
      'Quand le lait est entièrement incorporé, ajouter le mélange eau levure et pétrir la pâte pendant 15 minutes sur le plan de travail.',
      "Former une boule, la placer dans le saladier, couvrir d'un linge et laisser reposer deux heures.",
      "Au bout de deux heures, étaler la pâte sur le plan de travail en forme d'étoile à quatre branches en gardant le centre plus épais.",
      'Étaler le beurre au centre et replier les branches.',
      "Étaler alors ce pâton en un rectangle. Replier ce rectangle en trois et faire pivoter le rectangle d'un quart de tour sur la droite. Allonger à nouveau la pâte en rectangle, la replier en trois et tourner d'un quart de tour à droite.",
      'Recommencer une fois cette opération. La pâte feuilletée levée est prête.',
      'Deuxième étape : les croissants.',
      'Étaler la pâte feuilletée levée finement et découper des triangles. Rouler les triangles en partant de la base pour finir par la pointe, leur donner une forme de croissant.',
      'Laisser reposer les croissants deux heures. allumer le four thermostat 8 (240°C).',
      "Après le repos, badigeonner au pinceau les croissant d'oeuf battu en prenant soin de ne pas les faire retomber.",
      'Faire cuire 5 min à four chaud puis 10 à 15 min à thermostat 5/6 (160-170°C).',
    ],
  },
  {
    title: 'Pizza',
    type: 1,
    ingredients: [
      {
        name: 'fromage râpé (mozzarella ou mélange mozza/cheddar/parmesan recommandés)',
        quantity: 200,
        weight: 'g',
      },
      {
        name: 'sauce tomate pour pâtes/pizza (épicée ou non selon votre goût)',
        quantity: 20,
        weight: 'cl',
      },
      { name: 'poivre', quantity: 1, weight: 'pincée' },
      { name: 'sel', quantity: 2, weight: 'pincée' },
      { name: 'bicarbonate', quantity: 0.5, weight: 'cuillère à café' },
      { name: 'levure à pain', quantity: 1, weight: 'sachet' },
      { name: 'Farine à pizza (blanche ou complète)', quantity: 300, weight: 'g' },
      { name: 'eau', quantity: 20, weight: 'cl' },
      { name: 'viande (bœuf haché ou non, dès de poulet...)', quantity: 250, weight: 'g' },
      { name: 'herbes de Provence', quantity: 1, weight: 'pincée' },
      { name: 'olives noires dénoyautées', quantity: 8, weight: 'pcs' },
      { name: "sel d'ail ou poudre d'ail", quantity: 2, weight: 'pincées' },
      { name: 'paprika', quantity: 2, weight: 'pincées' },
    ],
    recipe: [
      "Dans un saladier, placez les 300 g de farine, puis la levure, puis le bicarbonate de soude, la pincée de sel et celle de poivre. Ajoutez aussi le paprika et le sel d'ail selon votre goût. Mélangez à sec pour homogénéiser les ingrédients.",
      "Versez ensuite la moitié des 20 cl d'eau, remuez avec votre doigt. Versez enfin le reste de l'eau puis remuez, lorsque la pâte est collante, utilisez votre main pour mélanger le tout, jusqu'à obtenir une pâte collante sans reste de farine.",
      "Ajoutez alors un peu de farine à la main, mélangez et pétrissez. Recommencez l'opération (farine plus pétrissage) jusqu'à obtenir une boule de pâte que ne colle plus.",
      'Mettez un peu de farine au fond de votre saladier et sur ses côtés, puis remettez la boule dedans, et couvrez avec un torchon propre.',
      'Laissez reposer la pâte environ 2 heures (ou moins voire pas du tout si vous êtes pressés).',
      'Préparation de la pizza. Mettez votre four à préchauffer à 220°C. Sur votre plan de travail, étalez un peu de farine afin que la boule de colle pas.',
      "Saupoudrez votre boule d'un peu de farine et sortez là du saladier. Avec un rouleau à pâtisserie, faites-en un disque d'environ 35 cm de diamètre.",
      'Posez la pâte ainsi formée sur votre plaque, avec en dessous du papier sulfurisé ou à défaut de la farine, pour que la pâte ne reste pas collée sur la plaque à la cuisson.',
      "Étalez la sauce tomate sur la pâte, jusqu'à ne presque plus voir la pâte au travers (2 à 3 mm d'épaisseur de sauce).",
      "Repartissez ensuite la viande sur la surface. Faites de même avec le fromage, jusqu'à couvrir correctement toute la surface. Enfin placez les olives. Saupoudrez d'une belle pincée d'herbes de Provence.",
      'Enfournez au milieu du four pendant 8 min pour une pâte moelleuse, 10 à 12 min pour une pâte plus croustillante.',
      'Sortez la pizza quand le fromage est bien fondu et commence à faire des bulles et à dorer. Découpez et servez.',
    ],
  },
  {
    title: 'Glace à la vanille',
    type: 2,
    ingredients: [
      { name: 'sucre roux', quantity: 4, weight: 'cuillères à soupe' },
      { name: 'oeufs', quantity: 3, weight: 'pcs' },
      { name: 'crème liquide (type fleurette)', quantity: 250, weight: 'g' },
      {
        name: 'sucre vanillé de bourbon ou extrait de vanille liquide',
        quantity: 2,
        weight: 'sachets',
      },
    ],
    recipe: [
      'Dans un grand saladier, mettre les jaunes d’œufs avec le sucre de canne et le sucre vanillé. Les battre jusqu’a obtenir un mélange blanchâtre.',
      'Dans un second saladier, monter la crème fraîche en chantilly avec un glaçon. (Mettre la crème fraîche 30 mn au congélateur).',
      'Dans un troisième saladier, battre les blancs en neige bien fermes.',
      'Ajouter le second saladier dans le premier en mélangeant délicatement.',
      'Ajouter le troisième saladier dans le premier en mélangeant délicatement.',
      'Verser dans des petits ramequins en aluminium ou dans de grandes barquettes.',
      'Mettre au congélateur pendant 24 à 48 H.',
      'Servir avec du chocolat chaud ou du caramel, ou encore un coulis de fruits.',
    ],
  },
]

let date = new dateFormater()
export const FAKE_EVENTS = [
  {
    id: 0,
    title: 'Croissant',
    fullDay: true,
    date: date.getFormatedDate(),
    type: 0,
    color: 'red',
    extendedProps: {
      ingredients: [
        { name: 'sel', quantity: 10, weight: 'g' },
        { name: 'levure de boulanger', quantity: 15, weight: 'g' },
        { name: 'farine type 45', quantity: 500, weight: 'g' },
        { name: 'eau', quantity: 2, weight: 'cuillères à soupe' },
        { name: 'sucre', quantity: 50, weight: 'g' },
        { name: 'beurre tendre', quantity: 180, weight: 'g' },
        { name: 'lait', quantity: 28, weight: 'cl' },
        { name: 'oeuf', quantity: 1, weight: 'pcs' },
      ],
      recipe: [
        'Première étape : la pâte feuilletée levée.',
        "Délayer la levure dans l'eau tiède. Dans un grand saladier, déposer la farine, le sel, le sucre, creuser un puits et incorporer petit à petit le lait.",
        'Quand le lait est entièrement incorporé, ajouter le mélange eau levure et pétrir la pâte pendant 15 minutes sur le plan de travail.',
        "Former une boule, la placer dans le saladier, couvrir d'un linge et laisser reposer deux heures.",
        "Au bout de deux heures, étaler la pâte sur le plan de travail en forme d'étoile à quatre branches en gardant le centre plus épais.",
        'Étaler le beurre au centre et replier les branches.',
        "Étaler alors ce pâton en un rectangle. Replier ce rectangle en trois et faire pivoter le rectangle d'un quart de tour sur la droite. Allonger à nouveau la pâte en rectangle, la replier en trois et tourner d'un quart de tour à droite.",
        'Recommencer une fois cette opération. La pâte feuilletée levée est prête.',
        'Deuxième étape : les croissants.',
        'Étaler la pâte feuilletée levée finement et découper des triangles. Rouler les triangles en partant de la base pour finir par la pointe, leur donner une forme de croissant.',
        'Laisser reposer les croissants deux heures. allumer le four thermostat 8 (240°C).',
        "Après le repos, badigeonner au pinceau les croissant d'oeuf battu en prenant soin de ne pas les faire retomber.",
        'Faire cuire 5 min à four chaud puis 10 à 15 min à thermostat 5/6 (160-170°C).',
      ],
    },
  },
  {
    id: 1,
    title: 'Pizza',
    fullDay: true,
    date: date.getFormatedDate(),
    type: 1,
    color: 'green',
    extendedProps: {
      ingredients: [
        {
          name: 'fromage râpé (mozzarella ou mélange mozza/cheddar/parmesan recommandés)',
          quantity: 200,
          weight: 'g',
        },
        {
          name: 'sauce tomate pour pâtes/pizza (épicée ou non selon votre goût)',
          quantity: 20,
          weight: 'cl',
        },
        { name: 'poivre', quantity: 1, weight: 'pincée' },
        { name: 'sel', quantity: 2, weight: 'pincée' },
        { name: 'bicarbonate', quantity: 0.5, weight: 'cuillère à café' },
        { name: 'levure à pain', quantity: 1, weight: 'sachet' },
        { name: 'Farine à pizza (blanche ou complète)', quantity: 300, weight: 'g' },
        { name: 'eau', quantity: 20, weight: 'cl' },
        { name: 'viande (bœuf haché ou non, dès de poulet...)', quantity: 250, weight: 'g' },
        { name: 'herbes de Provence', quantity: 1, weight: 'pincée' },
        { name: 'olives noires dénoyautées', quantity: 8, weight: 'pcs' },
        { name: "sel d'ail ou poudre d'ail", quantity: 2, weight: 'pincées' },
        { name: 'paprika', quantity: 2, weight: 'pincées' },
      ],
      recipe: [
        "Dans un saladier, placez les 300 g de farine, puis la levure, puis le bicarbonate de soude, la pincée de sel et celle de poivre. Ajoutez aussi le paprika et le sel d'ail selon votre goût. Mélangez à sec pour homogénéiser les ingrédients.",
        "Versez ensuite la moitié des 20 cl d'eau, remuez avec votre doigt. Versez enfin le reste de l'eau puis remuez, lorsque la pâte est collante, utilisez votre main pour mélanger le tout, jusqu'à obtenir une pâte collante sans reste de farine.",
        "Ajoutez alors un peu de farine à la main, mélangez et pétrissez. Recommencez l'opération (farine plus pétrissage) jusqu'à obtenir une boule de pâte que ne colle plus.",
        'Mettez un peu de farine au fond de votre saladier et sur ses côtés, puis remettez la boule dedans, et couvrez avec un torchon propre.',
        'Laissez reposer la pâte environ 2 heures (ou moins voire pas du tout si vous êtes pressés).',
        'Préparation de la pizza. Mettez votre four à préchauffer à 220°C. Sur votre plan de travail, étalez un peu de farine afin que la boule de colle pas.',
        "Saupoudrez votre boule d'un peu de farine et sortez là du saladier. Avec un rouleau à pâtisserie, faites-en un disque d'environ 35 cm de diamètre.",
        'Posez la pâte ainsi formée sur votre plaque, avec en dessous du papier sulfurisé ou à défaut de la farine, pour que la pâte ne reste pas collée sur la plaque à la cuisson.',
        "Étalez la sauce tomate sur la pâte, jusqu'à ne presque plus voir la pâte au travers (2 à 3 mm d'épaisseur de sauce).",
        "Repartissez ensuite la viande sur la surface. Faites de même avec le fromage, jusqu'à couvrir correctement toute la surface. Enfin placez les olives. Saupoudrez d'une belle pincée d'herbes de Provence.",
        'Enfournez au milieu du four pendant 8 min pour une pâte moelleuse, 10 à 12 min pour une pâte plus croustillante.',
        'Sortez la pizza quand le fromage est bien fondu et commence à faire des bulles et à dorer. Découpez et servez.',
      ],
    },
  },
  {
    id: 2,
    title: 'Glace à la vanille',
    fullDay: true,
    date: date.getFormatedDate(),
    type: 2,
    color: 'blue',
    extendedProps: {
      ingredients: [
        { name: 'sucre roux', quantity: 4, weight: 'cuillères à soupe' },
        { name: 'oeufs', quantity: 3, weight: 'pcs' },
        { name: 'crème liquide (type fleurette)', quantity: 250, weight: 'g' },
        {
          name: 'sucre vanillé de bourbon ou extrait de vanille liquide',
          quantity: 2,
          weight: 'sachets',
        },
      ],
      recipe: [
        'Dans un grand saladier, mettre les jaunes d’œufs avec le sucre de canne et le sucre vanillé. Les battre jusqu’a obtenir un mélange blanchâtre.',
        'Dans un second saladier, monter la crème fraîche en chantilly avec un glaçon. (Mettre la crème fraîche 30 mn au congélateur).',
        'Dans un troisième saladier, battre les blancs en neige bien fermes.',
        'Ajouter le second saladier dans le premier en mélangeant délicatement.',
        'Ajouter le troisième saladier dans le premier en mélangeant délicatement.',
        'Verser dans des petits ramequins en aluminium ou dans de grandes barquettes.',
        'Mettre au congélateur pendant 24 à 48 H.',
        'Servir avec du chocolat chaud ou du caramel, ou encore un coulis de fruits.',
      ],
    },
  },
]

export const PRODUCTS_TYPES = ['viande', 'poisson', 'légume', 'fruit', 'épice', 'autre']
