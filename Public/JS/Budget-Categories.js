import * as Maintain from './Maintain-Budget';
import * as Person from './Person';
import * as Utility from './Utility';
////////////////////////////////
// ICONS FOR MAIN CATEGORIES
export const icons = [
  `address-book`,
  `address-card`,
  `adjust`,
  `air-freshener`,
  `align-center`,
  `align-justify`,
  `align-left`,
  `align-right`,
  `allergies`,
  `ambulance`,
  `american-sign-language-interpreting`,
  `anchor`,
  `angle-double-down`,
  `angle-double-left`,
  `angle-double-right`,
  `angle-double-up`,
  `angle-down`,
  `angle-left`,
  `angle-right`,
  `angle-up`,
  `angry`,
  `ankh`,
  `apple-alt`,
  `archive`,
  `archway`,
  `arrow-alt-circle-down`,
  `arrow-alt-circle-left`,
  `arrow-alt-circle-right`,
  `arrow-alt-circle-up`,
  `arrow-down`,
  `arrow-left`,
  `arrow-right`,
  `arrows-alt`,
  `arrows-alt-h`,
  `arrows-alt-v`,
  `arrow-up`,
  `assistive-listening-systems`,
  `asterisk`,
  `at`,
  `atlas`,
  `atom`,
  `baby-carriage`,
  `backspace`,
  `backward`,
  `bacon`,
  `bahai`,
  `balance-scale`,
  `balance-scale-left`,
  `balance-scale-right`,
  `ban`,
  `band-aid`,
  `barcode`,
  `bars`,
  `baseball-ball`,
  `basketball-ball`,
  `bath`,
  `battery-empty`,
  `battery-full`,
  `battery-half`,
  `battery-quarter`,
  `battery-three-quarters`,
  `bed`,
  `beer`,
  `bell`,
  `bell-slash`,
  `bezier-curve`,
  `bible`,
  `bicycle`,
  `biking`,
  `binoculars`,
  `biohazard`,
  `birthday-cake`,
  `blender`,
  `blender-phone`,
  `blind`,
  `blog`,
  `bold`,
  `bolt`,
  `bomb`,
  `bone`,
  `bong`,
  `book`,
  `book-dead`,
  `bookmark`,
  `book-medical`,
  `book-open`,
  `book-reader`,
  `border-all`,
  `border-none`,
  `border-style`,
  `bowling-ball`,
  `box`,
  `boxes`,
  `box-open`,
  `braille`,
  `brain`,
  `bread-slice`,
  `briefcase`,
  `briefcase-medical`,
  `broadcast-tower`,
  `broom`,
  `brush`,
  `bug`,
  `building`,
  `bullhorn`,
  `bullseye`,
  `burn`,
  `bus`,
  `bus-alt`,
  `business-time`,
  `calculator`,
  `calendar`,
  `calendar-alt`,
  `calendar-check`,
  `calendar-day`,
  `calendar-minus`,
  `calendar-plus`,
  `calendar-times`,
  `calendar-week`,
  `camera`,
  `camera-retro`,
  `campground`,
  `candy-cane`,
  `cannabis`,
  `capsules`,
  `car`,
  `car-alt`,
  `caravan`,
  `car-battery`,
  `car-crash`,
  `caret-down`,
  `caret-left`,
  `caret-right`,
  `caret-square-down`,
  `caret-square-left`,
  `caret-square-right`,
  `caret-square-up`,
  `caret-up`,
  `carrot`,
  `car-side`,
  `cart-arrow-down`,
  `cart-plus`,
  `cash-register`,
  `cat`,
  `certificate`,
  `chair`,
  `chalkboard`,
  `chalkboard-teacher`,
  `charging-station`,
  `chart-area`,
  `chart-bar`,
  `chart-line`,
  `chart-pie`,
  `check`,
  `check-circle`,
  `check-double`,
  `check-square`,
  `cheese`,
  `chess`,
  `chess-bishop`,
  `chess-board`,
  `chess-king`,
  `chess-knight`,
  `chess-pawn`,
  `chess-queen`,
  `chess-rook`,
  `chevron-circle-down`,
  `chevron-circle-left`,
  `chevron-circle-right`,
  `chevron-circle-up`,
  `chevron-down`,
  `chevron-left`,
  `chevron-right`,
  `chevron-up`,
  `child`,
  `church`,
  `circle`,
  `circle-notch`,
  `city`,
  `clinic-medical`,
  `clipboard`,
  `clipboard-check`,
  `clipboard-list`,
  `clock`,
  `clone`,
  `closed-captioning`,
  `cloud`,
  `cloud-download-alt`,
  `cloud-meatball`,
  `cloud-moon`,
  `cloud-moon-rain`,
  `cloud-rain`,
  `cloud-showers-heavy`,
  `cloud-sun`,
  `cloud-sun-rain`,
  `cocktail`,
  `code`,
  `code-branch`,
  `coffee`,
  `cog`,
  `cogs`,
  `coins`,
  `columns`,
  `comment`,
  `comment-alt`,
  `comment-dollar`,
  `comment-dots`,
  `comment-medical`,
  `comments`,
  `comments-dollar`,
  `comment-slash`,
  `compact-disc`,
  `compress`,
  `compress-alt`,
  `compress-arrows-alt`,
  `concierge-bell`,
  `cookie`,
  `cookie-bite`,
  `copy`,
  `copyright`,
  `couch`,
  `credit-card`,
  `crop`,
  `crop-alt`,
  `cross`,
  `crosshairs`,
  `crow`,
  `crown`,
  `crutch`,
  `cube`,
  `cubes`,
  `cut`,
  `database`,
  `deaf`,
  `democrat`,
  `desktop`,
  `dharmachakra`,
  `diagnoses`,
  `dice`,
  `dice-d6`,
  `dice-d20`,
  `dice-five`,
  `dice-four`,
  `dice-one`,
  `dice-six`,
  `dice-three`,
  `dice-two`,
  `digital-tachograph`,
  `directions`,
  `divide`,
  `dizzy`,
  `dna`,
  `dog`,
  `dollar-sign`,
  `dolly`,
  `dolly-flatbed`,
  `donate`,
  `door-closed`,
  `door-open`,
  `dot-circle`,
  `dove`,
  `download`,
  `drafting-compass`,
  `dragon`,
  `draw-polygon`,
  `drum`,
  `drum-steelpan`,
  `drumstick-bite`,
  `dumbbell`,
  `dumpster`,
  `dumpster-fire`,
  `dungeon`,
  `edit`,
  `egg`,
  `eject`,
  `ellipsis-h`,
  `ellipsis-v`,
  `envelope`,
  `envelope-open`,
  `envelope-open-text`,
  `envelope-square`,
  `equals`,
  `eraser`,
  `ethernet`,
  `euro-sign`,
  `exchange-alt`,
  `exclamation`,
  `exclamation-circle`,
  `exclamation-triangle`,
  `expand`,
  `expand-alt`,
  `expand-arrows-alt`,
  `external-link-alt`,
  `external-link-square-alt`,
  `eye`,
  `eye-dropper`,
  `eye-slash`,
  `fan`,
  `fast-backward`,
  `fast-forward`,
  `fax`,
  `feather`,
  `feather-alt`,
  `female`,
  `fighter-jet`,
  `file`,
  `file-alt`,
  `file-archive`,
  `file-audio`,
  `file-code`,
  `file-contract`,
  `file-csv`,
  `file-download`,
  `file-excel`,
  `file-export`,
  `file-image`,
  `file-import`,
  `file-invoice`,
  `file-invoice-dollar`,
  `file-medical`,
  `file-medical-alt`,
  `file-pdf`,
  `file-powerpoint`,
  `file-prescription`,
  `file-signature`,
  `file-upload`,
  `file-video`,
  `file-word`,
  `fill`,
  `fill-drip`,
  `film`,
  `filter`,
  `fingerprint`,
  `fire`,
  `fire-alt`,
  `fire-extinguisher`,
  `first-aid`,
  `fish`,
  `fist-raised`,
  `flag`,
  `flag-checkered`,
  `flag-usa`,
  `flask`,
  `flushed`,
  `folder`,
  `folder-minus`,
  `folder-open`,
  `folder-plus`,
  `font`,
  `football-ball`,
  `forward`,
  `frog`,
  `frown`,
  `frown-open`,
  `funnel-dollar`,
  `futbol`,
  `gamepad`,
  `gas-pump`,
  `gavel`,
  `gem`,
  `genderless`,
  `ghost`,
  `gift`,
  `gifts`,
  `glass-cheers`,
  `glasses`,
  `glass-martini`,
  `glass-martini-alt`,
  `glass-whiskey`,
  `globe`,
  `globe-africa`,
  `globe-americas`,
  `globe-asia`,
  `globe-europe`,
  `golf-ball`,
  `gopuram`,
  `graduation-cap`,
  `greater-than`,
  `greater-than-equal`,
  `grimace`,
  `grin`,
  `grin-alt`,
  `grin-beam`,
  `grin-beam-sweat`,
  `grin-hearts`,
  `grin-squint`,
  `grin-squint-tears`,
  `grin-stars`,
  `grin-tears`,
  `grin-tongue`,
  `grin-tongue-squint`,
  `grin-tongue-wink`,
  `grin-wink`,
  `grip-horizontal`,
  `grip-lines`,
  `grip-lines-vertical`,
  `grip-vertical`,
  `guitar`,
  `hamburger`,
  `hammer`,
  `hamsa`,
  `hand-holding`,
  `hand-holding-heart`,
  `hand-holding-usd`,
  `hand-lizard`,
  `hand-middle-finger`,
  `hand-paper`,
  `hand-peace`,
  `hand-point-down`,
  `hand-pointer`,
  `hand-point-left`,
  `hand-point-right`,
  `hand-point-up`,
  `hand-rock`,
  `hands`,
  `hand-scissors`,
  `handshake`,
  `hands-helping`,
  `hand-spock`,
  `hanukiah`,
  `hard-hat`,
  `hashtag`,
  `hat-cowboy`,
  `hat-cowboy-side`,
  `hat-wizard`,
  `hdd`,
  `heading`,
  `headphones`,
  `headphones-alt`,
  `headset`,
  `heart`,
  `heartbeat`,
  `heart-broken`,
  `helicopter`,
  `highlighter`,
  `hiking`,
  `hippo`,
  `history`,
  `hockey-puck`,
  `holly-berry`,
  `home`,
  `horse`,
  `horse-head`,
  `hospital`,
  `hospital-alt`,
  `hospital-symbol`,
  `hotdog`,
  `hotel`,
  `hot-tub`,
  `hourglass`,
  `hourglass-end`,
  `hourglass-half`,
  `hourglass-start`,
  `house-damage`,
  `hryvnia`,
  `h-square`,
  `ice-cream`,
  `icicles`,
  `icons`,
  `i-cursor`,
  `id-badge`,
  `id-card`,
  `id-card-alt`,
  `igloo`,
  `image`,
  `images`,
  `inbox`,
  `indent`,
  `industry`,
  `infinity`,
  `info`,
  `info-circle`,
  `italic`,
  `jedi`,
  `joint`,
  `journal-whills`,
  `kaaba`,
  `key`,
  `keyboard`,
  `khanda`,
  `kiss`,
  `kiss-beam`,
  `kiss-wink-heart`,
  `kiwi-bird`,
  `landmark`,
  `language`,
  `laptop`,
  `laptop-code`,
  `laptop-medical`,
  `laugh`,
  `laugh-beam`,
  `laugh-squint`,
  `laugh-wink`,
  `layer-group`,
  `leaf`,
  `lemon`,
  `less-than`,
  `less-than-equal`,
  `level-down-alt`,
  `level-up-alt`,
  `life-ring`,
  `lightbulb`,
  `link`,
  `lira-sign`,
  `list`,
  `list-alt`,
  `list-ol`,
  `list-ul`,
  `location-arrow`,
  `lock`,
  `lock-open`,
  `long-arrow-alt-down`,
  `long-arrow-alt-left`,
  `long-arrow-alt-right`,
  `long-arrow-alt-up`,
  `low-vision`,
  `luggage-cart`,
  `magic`,
  `magnet`,
  `mail-bulk`,
  `male`,
  `map`,
  `map-marked`,
  `map-marked-alt`,
  `map-marker`,
  `map-marker-alt`,
  `map-pin`,
  `map-signs`,
  `marker`,
  `mars`,
  `mars-double`,
  `mars-stroke`,
  `mars-stroke-h`,
  `mars-stroke-v`,
  `mask`,
  `medal`,
  `medkit`,
  `meh`,
  `meh-blank`,
  `meh-rolling-eyes`,
  `memory`,
  `menorah`,
  `mercury`,
  `meteor`,
  `microchip`,
  `microphone`,
  `microphone-alt`,
  `microphone-alt-slash`,
  `microphone-slash`,
  `microscope`,
  `minus`,
  `minus-circle`,
  `minus-square`,
  `mitten`,
  `mobile`,
  `mobile-alt`,
  `money-bill`,
  `money-bill-alt`,
  `money-bill-wave`,
  `money-bill-wave-alt`,
  `money-check`,
  `money-check-alt`,
  `monument`,
  `moon`,
  `mortar-pestle`,
  `mosque`,
  `motorcycle`,
  `mountain`,
  `mouse`,
  `mouse-pointer`,
  `mug-hot`,
  `music`,
  `network-wired`,
  `neuter`,
  `newspaper`,
  `not-equal`,
  `notes-medical`,
  `object-group`,
  `object-ungroup`,
  `oil-can`,
  `om`,
  `otter`,
  `outdent`,
  `pager`,
  `paint-brush`,
  `paint-roller`,
  `palette`,
  `pallet`,
  `paperclip`,
  `paper-plane`,
  `parachute-box`,
  `paragraph`,
  `parking`,
  `passport`,
  `pastafarianism`,
  `paste`,
  `pause`,
  `pause-circle`,
  `paw`,
  `peace`,
  `pen`,
  `pen-alt`,
  `pencil-alt`,
  `pencil-ruler`,
  `pen-fancy`,
  `pen-nib`,
  `pen-square`,
  `people-carry`,
  `pepper-hot`,
  `percent`,
  `percentage`,
  `person-booth`,
  `phone`,
  `phone-alt`,
  `phone-slash`,
  `phone-square`,
  `phone-square-alt`,
  `phone-volume`,
  `photo-video`,
  `piggy-bank`,
  `pills`,
  `pizza-slice`,
  `place-of-worship`,
  `plane`,
  `plane-arrival`,
  `plane-departure`,
  `play`,
  `play-circle`,
  `plug`,
  `plus`,
  `plus-circle`,
  `plus-square`,
  `podcast`,
  `poll`,
  `poll-h`,
  `poo`,
  `poop`,
  `poo-storm`,
  `portrait`,
  `pound-sign`,
  `power-off`,
  `pray`,
  `praying-hands`,
  `prescription`,
  `prescription-bottle`,
  `prescription-bottle-alt`,
  `print`,
  `procedures`,
  `project-diagram`,
  `puzzle-piece`,
  `qrcode`,
  `question`,
  `question-circle`,
  `quidditch`,
  `quote-left`,
  `quote-right`,
  `quran`,
  `radiation`,
  `radiation-alt`,
  `rainbow`,
  `random`,
  `receipt`,
  `record-vinyl`,
  `recycle`,
  `redo`,
  `redo-alt`,
  `registered`,
  `remove-format`,
  `reply`,
  `reply-all`,
  `republican`,
  `restroom`,
  `retweet`,
  `ribbon`,
  `ring`,
  `road`,
  `robot`,
  `rocket`,
  `route`,
  `rss`,
  `rss-square`,
  `ruble-sign`,
  `ruler`,
  `ruler-combined`,
  `ruler-horizontal`,
  `ruler-vertical`,
  `running`,
  `rupee-sign`,
  `sad-cry`,
  `sad-tear`,
  `satellite`,
  `satellite-dish`,
  `save`,
  `school`,
  `screwdriver`,
  `scroll`,
  `sd-card`,
  `search`,
  `search-dollar`,
  `search-location`,
  `search-minus`,
  `search-plus`,
  `seedling`,
  `server`,
  `shapes`,
  `share`,
  `share-alt`,
  `share-alt-square`,
  `share-square`,
  `shekel-sign`,
  `shield-alt`,
  `ship`,
  `shipping-fast`,
  `shoe-prints`,
  `shopping-bag`,
  `shopping-basket`,
  `shopping-cart`,
  `shower`,
  `shuttle-van`,
  `sign`,
  `signal`,
  `signature`,
  `sign-in-alt`,
  `sign-language`,
  `sign-out-alt`,
  `sim-card`,
  `sitemap`,
  `skating`,
  `skiing`,
  `skiing-nordic`,
  `skull`,
  `skull-crossbones`,
  `slash`,
  `sleigh`,
  `sliders-h`,
  `smile`,
  `smile-beam`,
  `smile-wink`,
  `smog`,
  `smoking`,
  `smoking-ban`,
  `sms`,
  `snowboarding`,
  `snowflake`,
  `snowman`,
  `snowplow`,
  `socks`,
  `solar-panel`,
  `sort`,
  `sort-alpha-down`,
  `sort-alpha-down-alt`,
  `sort-alpha-up`,
  `sort-alpha-up-alt`,
  `sort-amount-down`,
  `sort-amount-down-alt`,
  `sort-amount-up`,
  `sort-amount-up-alt`,
  `sort-down`,
  `sort-numeric-down`,
  `sort-numeric-down-alt`,
  `sort-numeric-up`,
  `sort-numeric-up-alt`,
  `sort-up`,
  `spa`,
  `space-shuttle`,
  `spell-check`,
  `spider`,
  `spinner`,
  `splotch`,
  `spray-can`,
  `square`,
  `square-full`,
  `square-root-alt`,
  `stamp`,
  `star`,
  `star-and-crescent`,
  `star-half`,
  `star-half-alt`,
  `star-of-david`,
  `star-of-life`,
  `step-backward`,
  `step-forward`,
  `stethoscope`,
  `sticky-note`,
  `stop`,
  `stop-circle`,
  `stopwatch`,
  `store`,
  `store-alt`,
  `stream`,
  `street-view`,
  `strikethrough`,
  `stroopwafel`,
  `subscript`,
  `subway`,
  `suitcase`,
  `suitcase-rolling`,
  `sun`,
  `superscript`,
  `surprise`,
  `swatchbook`,
  `swimmer`,
  `swimming-pool`,
  `synagogue`,
  `sync`,
  `sync-alt`,
  `syringe`,
  `table`,
  `tablet`,
  `tablet-alt`,
  `table-tennis`,
  `tablets`,
  `tachometer-alt`,
  `tag`,
  `tags`,
  `tape`,
  `tasks`,
  `taxi`,
  `teeth`,
  `teeth-open`,
  `temperature-high`,
  `temperature-low`,
  `tenge`,
  `terminal`,
  `text-height`,
  `text-width`,
  `th`,
  `theater-masks`,
  `thermometer`,
  `thermometer-empty`,
  `thermometer-full`,
  `thermometer-half`,
  `thermometer-quarter`,
  `thermometer-three-quarters`,
  `th-large`,
  `th-list`,
  `thumbs-down`,
  `thumbs-up`,
  `thumbtack`,
  `ticket-alt`,
  `times`,
  `times-circle`,
  `tint`,
  `tint-slash`,
  `tired`,
  `toggle-off`,
  `toggle-on`,
  `toilet`,
  `toilet-paper`,
  `toolbox`,
  `tools`,
  `tooth`,
  `torah`,
  `torii-gate`,
  `tractor`,
  `trademark`,
  `traffic-light`,
  `trailer`,
  `train`,
  `tram`,
  `transgender`,
  `transgender-alt`,
  `trash`,
  `trash-alt`,
  `trash-restore`,
  `trash-restore-alt`,
  `tree`,
  `trophy`,
  `truck`,
  `truck-loading`,
  `truck-monster`,
  `truck-moving`,
  `truck-pickup`,
  `tshirt`,
  `tty`,
  `tv`,
  `umbrella`,
  `umbrella-beach`,
  `underline`,
  `undo`,
  `undo-alt`,
  `universal-access`,
  `university`,
  `unlink`,
  `unlock`,
  `unlock-alt`,
  `upload`,
  `user`,
  `user-alt`,
  `user-alt-slash`,
  `user-astronaut`,
  `user-check`,
  `user-circle`,
  `user-clock`,
  `user-cog`,
  `user-edit`,
  `user-friends`,
  `user-graduate`,
  `user-injured`,
  `user-lock`,
  `user-md`,
  `user-minus`,
  `user-ninja`,
  `user-nurse`,
  `user-plus`,
  `users`,
  `users-cog`,
  `user-secret`,
  `user-shield`,
  `user-slash`,
  `user-tag`,
  `user-tie`,
  `user-times`,
  `utensils`,
  `utensil-spoon`,
  `vector-square`,
  `venus`,
  `venus-double`,
  `venus-mars`,
  `vial`,
  `vials`,
  `video`,
  `video-slash`,
  `vihara`,
  `voicemail`,
  `volleyball-ball`,
  `volume-down`,
  `volume-mute`,
  `volume-off`,
  `volume-up`,
  `vote-yea`,
  `vr-cardboard`,
  `walking`,
  `wallet`,
  `warehouse`,
  `water`,
  `wave-square`,
  `weight`,
  `weight-hanging`,
  `wheelchair`,
  `wifi`,
  `wind`,
  `window-close`,
  `window-maximize`,
  `window-minimize`,
  `window-restore`,
  `wine-bottle`,
  `wine-glass`,
  `wine-glass-alt`,
  `won-sign`,
  `wrench`,
  `x-ray`,
  `yen-sign`,
  `yin-yang`,
];

////////////////////////////////////////
// CATEGORY -- PARENT CLASS
class Category {
  constructor(options) {
    this.icon = options.icon;
    this.title = options.title;
  }
}

////////////////////////////////////////
// MAIN CATEGORY -- CHILD CLASS
export class MainCategory extends Category {
  constructor(options) {
    const superOpts = { ...options };
    super(superOpts);
    this.subCategories = [];
  }

  _deleteSubCategory(index) {
    this.subCategories = this.subCategories.filter((sc) => {
      return sc != this.subCategories[index];
    });
  }
}

////////////////////////////////////////
// SUB CATEGORY -- CHILD CLASS
export class SubCategory extends Category {
  constructor(options) {
    const superOpts = { ...options };
    super(superOpts);
    this.timingOptions = {};
    this.goalAmount = 0;
    this.amountSpent = 0;
    this.amountRemaining = 0;
    this.percentageSpent = 0;
    this.surplus = false;
  }

  _makeSurplus() {
    this.surplus = !this.surplus;
  }
}

////////////////////////////////////////
// CAPITALIZING CATEGORIES
const _capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

////////////////////////////////////////
// SUB CATEGORY CREATION PROCESS
export const createSubCategory = (budget, index) => {
  const mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  const mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[1];
  // Creating Sub Category Container
  const subCategory = document.createElement('section');
  // Adding Sub Category Classes
  subCategory.classList.add('sub-category');
  subCategory.classList.add('r__sub-category');
  subCategory.dataset.category = `${index}`;

  // Creating the title container
  const subCategoryTitleContainer = document.createElement('section');
  // Adding the title container's classes
  subCategoryTitleContainer.classList.add('sub-category-title-container');
  subCategoryTitleContainer.classList.add('r__sub-category-title-container');

  // Creating the title element
  const subCategoryTitleElement = document.createElement('p');
  // Adding title element's classes
  subCategoryTitleElement.classList.add('sub-category-title-container__title');
  subCategoryTitleElement.classList.add('r__sub-category-title-container__title');

  // Select Category Creation Input
  const subCategoryTitleInput = document.querySelector('.form__input--sub-category-title');

  // Add Title Text Content
  subCategoryTitleElement.textContent = subCategoryTitleInput.value.split(' ').map(_capitalize).join(' ');

  // Creating Sub Category Controller
  const subCategoryController = document.createElement('section');
  // Adding classes to Sub Category Controller
  subCategoryController.classList.add('sub-category-controller');
  subCategoryController.classList.add('r__sub-category-controller');

  // Creating Surplus Container inside the controller.
  const subCategorySurplusContainer = document.createElement('section');
  subCategorySurplusContainer.classList.add('sub-category-controller__surplus-container');
  subCategorySurplusContainer.classList.add('r__sub-category-controller__surplus-container');

  // Creating Surplus Container Title Element
  const surplusContainerTitle = document.createElement('p');
  surplusContainerTitle.classList.add('sub-category-controller__surplus-container__title');
  surplusContainerTitle.classList.add('r__sub-category-controller__surplus-container__title');
  surplusContainerTitle.textContent = `Surplus?`;

  if (mainCategoryContainer) {
    // Create Surplus Switch
    const surplusContainerSwitch = document.createElement('section');
    surplusContainerSwitch.classList.add('sub-category-controller__surplus-container__switch');
    surplusContainerSwitch.classList.add('r__sub-category-controller__surplus-container__switch');

    // Create Surplus Switch Toggle
    const surplusSwitchToggle = document.createElement('section');
    surplusSwitchToggle.classList.add('sub-category-controller__surplus-container__switch__toggle');
    surplusSwitchToggle.classList.add('r__sub-category-controller__surplus-container__switch__toggle');

    const surplusSwitchToggleIcon = document.createElement('i');
    surplusSwitchToggleIcon.classList.add('fas');
    surplusSwitchToggleIcon.classList.add('fa-times');
    surplusSwitchToggleIcon.classList.add('sub-category-controller__surplus-container__switch__toggle__icon');
    surplusSwitchToggleIcon.classList.add('r__sub-category-controller__surplus-container__switch__toggle__icon');

    // Make Surplus Switch -- A SWITCH
    surplusContainerSwitch.addEventListener('click', (e) => {
      e.preventDefault();
      surplusContainerSwitch.classList.toggle('sub-category-controller__surplus-container__switch--switched');
      surplusSwitchToggleIcon.classList.toggle('fa-times');
      surplusSwitchToggleIcon.classList.toggle('fa-check');
      const subCategoriesArray = [...document.querySelectorAll('.sub-category')];
      const clicked = e.target;
      const subArray = subCategoriesArray.filter((sc, i) => {
        return Number(sc.dataset.category) === index;
      });
      const categoryNumber = Number(clicked.closest('.sub-category').dataset.category);
      const categoryTitle = subCategoryTitleElement.textContent;

      budget._makeSurplusSubCategory({ mainIndex: categoryNumber, subIndex: subArray.indexOf(clicked.closest('.sub-category')) });
    });

    const surplusCategoryTrashIcon = document.createElement('i');
    surplusCategoryTrashIcon.classList.add('fas');
    surplusCategoryTrashIcon.classList.add('fa-trash-alt');
    surplusCategoryTrashIcon.classList.add('sub-category-controller__icon');
    surplusCategoryTrashIcon.classList.add('r__sub-category-controller__icon');

    surplusCategoryTrashIcon.addEventListener('click', (e) => {
      e.preventDefault();
      const clicked = e.target;
      const selectedSubCategory = clicked.closest('.sub-category');

      /////////////////////////////
      // DELETE SUB CATEGORY
      const subCategoriesArray = [...document.querySelectorAll('.sub-category')];
      let subArray = subCategoriesArray.filter((sc, i) => {
        return Number(sc.dataset.category) === index;
      });
      const categoryNumber = Number(clicked.closest('.sub-category').dataset.category);

      /////////////////////////////
      // REMOVE DOM ELEMENT
      selectedSubCategory.remove();

      budget._deleteSubCategory(categoryNumber, subArray.indexOf(selectedSubCategory));
    });
    surplusSwitchToggle.insertAdjacentElement('beforeend', surplusSwitchToggleIcon);

    surplusContainerSwitch.insertAdjacentElement('beforeend', surplusSwitchToggle);

    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerTitle);
    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerSwitch);

    subCategoryController.insertAdjacentElement('beforeend', subCategorySurplusContainer);
    subCategoryController.insertAdjacentElement('beforeend', surplusCategoryTrashIcon);

    subCategoryTitleContainer.insertAdjacentElement('beforeend', subCategoryTitleElement);

    subCategory.insertAdjacentElement('beforeend', subCategoryTitleContainer);
    subCategory.insertAdjacentElement('beforeend', subCategoryController);
  }

  if (mainCategoryContainerTwo) {
    // Create Surplus Switch
    const surplusContainerSwitch = document.createElement('section');
    surplusContainerSwitch.classList.add('sub-category-controller__surplus-container__switch__alt');
    surplusContainerSwitch.classList.add('r__sub-category-controller__surplus-container__switch__alt');

    // Create Surplus Switch Toggle
    const surplusSwitchToggle = document.createElement('section');
    surplusSwitchToggle.classList.add('sub-category-controller__surplus-container__switch__alt__toggle');
    surplusSwitchToggle.classList.add('r__sub-category-controller__surplus-container__switch__alt__toggle');

    const surplusSwitchToggleIcon = document.createElement('i');
    surplusSwitchToggleIcon.classList.add('fas');
    surplusSwitchToggleIcon.classList.add('fa-times');
    surplusSwitchToggleIcon.classList.add('sub-category-controller__surplus-container__switch__alt__toggle__icon');
    surplusSwitchToggleIcon.classList.add('r__sub-category-controller__surplus-container__switch__alt__toggle__icon');

    // Make Surplus Switch -- A SWITCH
    surplusContainerSwitch.addEventListener('click', (e) => {
      e.preventDefault();
      surplusContainerSwitch.classList.toggle('sub-category-controller__surplus-container__switch__alt--switched');
      surplusSwitchToggleIcon.classList.toggle('fa-times');
      surplusSwitchToggleIcon.classList.toggle('fa-check');
      const subCategoriesArray = [...document.querySelectorAll('.sub-category')];
      const clicked = e.target;
      const subArray = subCategoriesArray.filter((sc, i) => {
        return Number(sc.dataset.category) === index;
      });
      const categoryNumber = Number(clicked.closest('.sub-category').dataset.category);
      const categoryTitle = subCategoryTitleElement.textContent;

      budget._makeSurplusSubCategory({ mainIndex: categoryNumber, subIndex: subArray.indexOf(clicked.closest('.sub-category')) });
    });

    const surplusCategoryTrashIcon = document.createElement('i');
    surplusCategoryTrashIcon.classList.add('fas');
    surplusCategoryTrashIcon.classList.add('fa-trash-alt');
    surplusCategoryTrashIcon.classList.add('sub-category-controller__icon');
    surplusCategoryTrashIcon.classList.add('r__sub-category-controller__icon');

    surplusCategoryTrashIcon.addEventListener('click', (e) => {
      e.preventDefault();
      const clicked = e.target;
      const selectedSubCategory = clicked.closest('.sub-category');

      /////////////////////////////
      // DELETE SUB CATEGORY
      const subCategoriesArray = [...document.querySelectorAll('.sub-category')];
      let subArray = subCategoriesArray.filter((sc, i) => {
        return Number(sc.dataset.category) === index;
      });
      const categoryNumber = Number(clicked.closest('.sub-category').dataset.category);

      /////////////////////////////
      // REMOVE DOM ELEMENT
      selectedSubCategory.remove();

      budget._deleteSubCategory(categoryNumber, subArray.indexOf(selectedSubCategory));
    });

    surplusSwitchToggle.insertAdjacentElement('beforeend', surplusSwitchToggleIcon);

    surplusContainerSwitch.insertAdjacentElement('beforeend', surplusSwitchToggle);

    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerTitle);
    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerSwitch);

    subCategoryController.insertAdjacentElement('beforeend', subCategorySurplusContainer);
    subCategoryController.insertAdjacentElement('beforeend', surplusCategoryTrashIcon);

    subCategoryTitleContainer.insertAdjacentElement('beforeend', subCategoryTitleElement);

    subCategory.insertAdjacentElement('beforeend', subCategoryTitleContainer);
    subCategory.insertAdjacentElement('beforeend', subCategoryController);
  }

  const subCategories = document.querySelectorAll('.sub-category');
  if (subCategoryTitleInput.value === '') return;
  if (subCategories.length === 0 && subCategoryTitleInput.value !== '' && subCategoryTitleInput.value !== undefined) {
    document.querySelector('.budget-creation-container--sub-categories__sub-category-display').insertAdjacentElement('afterbegin', subCategory);
  }
  if (subCategories.length > 0) {
    subCategories[subCategories.length - 1].insertAdjacentElement('afterend', subCategory);
  }
  if (!subCategoryTitleInput.value) return;

  // This is where it actually adds it to the budget object.
  budget._addSubCategory(index, `${subCategoryTitleElement.textContent}`);
};

export const _verifySubCategory = (budget, index) => {
  /////////////////////////////////////////////////
  // INITIALIZE NEEDED VARIABLES
  const mainCategoryContainer = document.querySelector('.budget-creation-container--sub-categories');
  const mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[1];
  let mainCategoryTitle, altMainCategoryTitle;
  if (mainCategoryContainer) {
    mainCategoryTitle = document.querySelector('.budget-creation-container--sub-categories__main-category-display__category-information__text').textContent.toLowerCase();
  }
  if (mainCategoryContainerTwo) {
    altMainCategoryTitle = document.querySelector('.main-category-display__category-information__text').textContent.toLowerCase();
  }
  let categoryIndex;

  ////////////////////////////////////
  // GETTING THE MAIN CATEGORY INDEX
  budget.mainCategories.forEach((mc, i) => {
    if (mainCategoryContainer) {
      if (mc.title.toLowerCase() === mainCategoryTitle) {
        categoryIndex = i;
        return categoryIndex;
      }
    }
    if (mainCategoryContainerTwo) {
      if (mc.title.toLowerCase() === altMainCategoryTitle) {
        categoryIndex = i;
        return categoryIndex;
      }
    }
  });
  // Get Category Creation Input Value In Lowercase
  const subCategoryTitle = document.querySelector('.form__input--sub-category-title').value.toLowerCase();

  //////////////////////////////////////////
  // CHECKING SUB CATEGORIES VS INPUT VALUE
  const filtered = budget.mainCategories[categoryIndex].subCategories.filter((sc) => {
    if (sc.title.toLowerCase() === subCategoryTitle) {
      return sc;
    }
  });

  /////////////////////////////////////////////////
  // ALLOW ONLY ONE SUB CATEGORY WITH THAT NAME
  if (filtered.length >= 1) return;
  // Function below used to use 'index' instead of categoryIndex, so it will need to be double checked in the budget creation form.
  createSubCategory(budget, categoryIndex);
};

////////////////////////////////////////
// MAIN CATEGORY DELETION PROCESS
const removeMainCategory = async (e, budget, filteredArray, person) => {
  const budgetPages = document.querySelectorAll('.form__page--centered');
  console.log(budgetPages, budgetPages[2].classList);
  let title = e.target.closest('section').firstChild.nextElementSibling.textContent;
  /////////////////////////////
  // CHECK USER
  const userInfo = await person._getPersonData();
  const user = userInfo.data.data.user;
  if (user.latterDaySaint === true) {
    if (budgetPages[2].classList.contains(`closed`)) return;
  }
  if (user.latterDaySaint === false) {
    if (!budgetPages[2].classList.contains(`closed`)) return;
  }
  budget._removeMainCategory(title);
  e.target.closest('section').remove();
  console.log(`DELETED`);
  return budget.mainCategories;
};

////////////////////////////////////////
// MAIN CATEGORY CREATION PROCESS
const createMainCategory = (element, budget, filteredArray, person) => {
  let mainCategoryTitle = document.querySelector('.form__input--main-category-title').value;
  mainCategoryTitle = mainCategoryTitle.split(' ').map(_capitalize).join(' ');
  // budget.mainCategories.push(new MainCategory({ icon: `${element}`, title: mainCategoryTitle }));
  const mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  const mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];
  if (mainCategoryContainer) {
    budget._addMainCategory(`${element}`, mainCategoryTitle);
    const mainCategory = document.createElement('section');
    mainCategory.classList.add('main-category');
    const iconImage = document.createElement('i');
    iconImage.classList.add('fas');
    iconImage.classList.add(`${element}`);
    iconImage.classList.add('main-category__icon');
    const iconsText = document.createElement('p');
    iconsText.classList.add('main-category__text');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas');
    deleteIcon.classList.add('fa-times');
    deleteButton.classList.add('main-category__delete');
    deleteButton.insertAdjacentElement('beforeend', deleteIcon);
    iconsText.textContent = mainCategoryTitle;
    mainCategory.insertAdjacentElement('beforeend', iconImage);
    mainCategory.insertAdjacentElement('beforeend', iconsText);
    if (mainCategoryContainer) {
      mainCategory.insertAdjacentElement('beforeend', deleteButton);
    }
    mainCategoryContainer.insertAdjacentElement('beforeend', mainCategory);
    const mainCategoryLength = document.querySelectorAll('.main-category').length;
    if (mainCategoryLength === 3) {
      document.querySelectorAll('.main-category')[2].style.borderTopRightRadius = `0.9rem`;
    }
    if (deleteButton) {
      deleteButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await removeMainCategory(e, budget, filteredArray, person);
      });
    }
  }

  if (mainCategoryContainerTwo) {
    budget._addMainCategory(`${element}`, mainCategoryTitle);
    const mainCategory = document.createElement('section');
    mainCategory.classList.add('main-category__alt');
    mainCategory.classList.add('r__main-category__alt');
    mainCategory.classList.add('open');
    const iconImage = document.createElement('i');
    iconImage.classList.add('fas');
    iconImage.classList.add(`${element}`);
    iconImage.classList.add('main-category__alt__icon');
    const iconsText = document.createElement('p');
    iconsText.classList.add('main-category__alt__text');

    iconsText.textContent = mainCategoryTitle;
    mainCategory.insertAdjacentElement('beforeend', iconImage);
    mainCategory.insertAdjacentElement('beforeend', iconsText);

    mainCategoryContainerTwo.insertAdjacentElement('beforeend', mainCategory);
    const mainCategoryLength = document.querySelectorAll('.main-category').length;
    if (mainCategoryLength === 3) {
      document.querySelectorAll('.main-category')[2].style.borderTopRightRadius = `0.9rem`;
    }
    console.log(budget);
    const mainCategories = document.querySelectorAll('.main-category__alt');
    mainCategory.dataset.category = `${mainCategories.length - 1}`;

    Maintain._watchForMainCategorySelection();
  }
};

////////////////////////////////////////
// CREATE MAIN CATEGORY

export const _verifyMainCategory = (icon, iconList, budget, person) => {
  let mainCategoryTitle = document.querySelector('.form__input--main-category-title').value.toLowerCase();
  const filtered = budget.mainCategories.filter((mc) => {
    if (mc.title.toLowerCase() === mainCategoryTitle) {
      return mc;
    }
  });
  if (filtered.length >= 1) return;
  createMainCategory(icon, budget, filtered, person);

  iconList.forEach((icon) => {
    icon.classList.remove('icon-container--clicked');
  });
};

////////////////////////////////////////
// FIND CLICKED ICON
const _findClickedIcon = (iconList, budget, person) => {
  iconList.forEach((icon) => {
    if (icon.classList.contains('icon-container--clicked')) {
      _verifyMainCategory(icon.firstChild.classList[1], iconList, budget, person);
    }
  });
};

const _setupCategoryCreation = (budget, person) => {
  const createMainCategoryButton = document.querySelectorAll('.button--small-create-main-category')[0];
  const iconContainers = document.querySelectorAll('.icon-container');
  if (createMainCategoryButton) {
    createMainCategoryButton.addEventListener('click', (e) => {
      e.preventDefault();
      _findClickedIcon(iconContainers, budget, person);
      closeCategoryCreation();
    });
  }
};

////////////////////////////////////////
// WATCH FOR ICON CLICKS
export const _clickIcon = (icon) => {
  const iconContainers = document.querySelectorAll('.icon-container');
  const iconsArray = Array.from(iconContainers);
  iconContainers.forEach((element, i) => {
    element.addEventListener('click', (e) => {
      const clicked = e.target;
      if (clicked.classList.contains('icon-container__icon') || clicked.classList[2] === `icon-container__icon`) {
        iconContainers.forEach((e) => {
          e.classList.remove('icon-container--clicked');
        });
        element.classList.add('icon-container--clicked');
        icon = clicked;
        return icon;
      }
      iconContainers.forEach((ic) => {
        ic.classList.remove('icon-container--clicked');
      });
      element.classList.add('icon-container--clicked');
      icon = clicked.firstChild;
      return icon;
    });
  });
};

////////////////////////////////////////
// HIDE CREATED ICONS
const _hideCreatedIcons = () => {
  const mainCategories = document.querySelectorAll('.main-category');
  const altMainCategories = document.querySelectorAll('.main-category__alt');
  const mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  const mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];
  console.log(altMainCategories);
  if (mainCategoryContainer) {
    if (mainCategories.length === 0) return;
    mainCategories.forEach((mc) => {
      mc.classList.add('closed');
      mc.classList.remove('open');
    });
  }
  if (mainCategoryContainerTwo) {
    if (altMainCategories.length === 0) return;
    altMainCategories.forEach((amc) => {
      amc.classList.add('closed');
      amc.classList.remove('open');
    });
  }
};

////////////////////////////////////////
// SHOW CREATED ICONS
const _showCreatedIcons = () => {
  const mainCategories = document.querySelectorAll('.main-category');
  const altMainCategories = document.querySelectorAll('.main-category__alt');
  const mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  const mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];
  if (mainCategoryContainer) {
    mainCategories.forEach((mc) => {
      mc.classList.add('open');
      mc.classList.remove('closed');
    });
  }
  if (mainCategoryContainerTwo) {
    altMainCategories.forEach((amc) => {
      amc.classList.add('open');
      amc.classList.remove('closed');
    });
  }
};

////////////////////////////////////////
// CLOSE CATEGORY CREATION
const closeCategoryCreation = () => {
  const createCategoryButton = document.querySelector('.button--medium-square');
  const createMainCategoryButton = document.querySelectorAll('.button--small-create-main-category')[0];
  const mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  const closeCreateCategoryButton = document.querySelectorAll('.button--small-create-main-category')[1];
  const iconsContainer = document.querySelector('.icons-container');
  const createCategoryTitle = document.querySelector('.form__section--main-category-title');
  createCategoryTitle.classList.toggle('closed');
  createCategoryTitle.classList.toggle('open');
  iconsContainer.classList.toggle('closed');
  iconsContainer.classList.toggle('open-grid');
  createCategoryButton.classList.toggle('closed');
  createCategoryButton.classList.toggle('open');
  createMainCategoryButton.classList.toggle('closed');
  createMainCategoryButton.classList.toggle('open');
  closeCreateCategoryButton.classList.toggle('closed');
  closeCreateCategoryButton.classList.toggle('open');
  if (mainCategoryContainer) mainCategoryContainer.classList.toggle('budget-creation-container--main-categories--creating');
  _showCreatedIcons();
};

////////////////////////////////////////
// OPEN CATEGORY CREATION
const openCategoryCreation = () => {
  const createCategoryButton = document.querySelector('.button--medium-square');
  const createMainCategoryButton = document.querySelectorAll('.button--small-create-main-category')[0];
  const mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  const closeCreateCategoryButton = document.querySelectorAll('.button--small-create-main-category')[1];
  const iconsContainer = document.querySelector('.icons-container');
  const createCategoryTitle = document.querySelector('.form__section--main-category-title');
  const mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];
  createCategoryTitle.classList.toggle('closed');
  createCategoryTitle.classList.toggle('open');
  iconsContainer.classList.toggle('closed');
  iconsContainer.classList.toggle('open-grid');
  createCategoryButton.classList.toggle('closed');
  createCategoryButton.classList.toggle('open');
  createMainCategoryButton.classList.toggle('closed');
  createMainCategoryButton.classList.toggle('open');
  closeCreateCategoryButton.classList.toggle('closed');
  closeCreateCategoryButton.classList.toggle('open');
  if (mainCategoryContainer) mainCategoryContainer.classList.toggle('budget-creation-container--main-categories--creating');
  _hideCreatedIcons();
};

export const _watchCreateCategoryButton = (icon, budget, person) => {
  const createCategoryButton = document.querySelector('.button--medium-square');
  createCategories(icon);
  if (createCategoryButton) {
    createCategoryButton.addEventListener('click', (e) => {
      e.preventDefault();
      openCategoryCreation();
    });
  }
  const closeCreateCategoryButton = document.querySelectorAll('.button--small-create-main-category')[1];
  if (closeCreateCategoryButton) {
    closeCreateCategoryButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeCategoryCreation();
    });
  }
  _setupCategoryCreation(budget, person);
};

////////////////////////////////////////
// SHOWING ICONS FOR MAIN CATEGORIES
export const createCategories = (icon, index) => {
  icons.forEach((iconImage, i) => {
    const mainContainer = document.querySelector('.icons-container');
    if (mainContainer) {
      const iconContainer = document.createElement(`section`);
      iconContainer.classList.add('icon-container');

      // Create Icon
      const icon = document.createElement('i');
      icon.classList.add('fas');
      icon.classList.add(`fa-${iconImage}`);
      icon.classList.add(`icon-container__icon`);

      // Create Icon Text
      const text = document.createElement('p');
      text.classList.add('icon-container__text');
      text.textContent = icons[i].split('-').join(' ');
      iconContainer.insertAdjacentElement('beforeend', icon);
      iconContainer.insertAdjacentElement('beforeend', text);
      mainContainer.insertAdjacentElement('beforeend', iconContainer);
    }
  });
  _clickIcon(icon);
};
