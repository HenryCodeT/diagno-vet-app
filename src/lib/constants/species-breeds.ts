export interface Species {
  id: string;
  nameEn: string;
  nameEs: string;
}

export interface Breed {
  id: string;
  speciesId: string;
  nameEn: string;
  nameEs: string;
}

export const SPECIES: Species[] = [
  { id: "canine", nameEn: "Canine", nameEs: "Canino" },
  { id: "feline", nameEn: "Feline", nameEs: "Felino" },
  { id: "equine", nameEn: "Equine", nameEs: "Equino" },
  { id: "bovine", nameEn: "Bovine", nameEs: "Bovino" },
  { id: "avian", nameEn: "Avian", nameEs: "Ave" },
  { id: "rabbit", nameEn: "Rabbit", nameEs: "Conejo" },
  { id: "rodent", nameEn: "Rodent", nameEs: "Roedor" },
  { id: "reptile", nameEn: "Reptile", nameEs: "Reptil" },
  { id: "exotic", nameEn: "Exotic", nameEs: "Exótico" },
  { id: "other", nameEn: "Other", nameEs: "Otro" },
];

export const BREEDS: Breed[] = [
  // Canine breeds
  { id: "mixed_dog", speciesId: "canine", nameEn: "Mixed Breed", nameEs: "Mestizo" },
  { id: "undefined_dog", speciesId: "canine", nameEn: "Undefined", nameEs: "Indefinido" },
  { id: "labrador", speciesId: "canine", nameEn: "Labrador Retriever", nameEs: "Labrador Retriever" },
  { id: "golden", speciesId: "canine", nameEn: "Golden Retriever", nameEs: "Golden Retriever" },
  { id: "german_shepherd", speciesId: "canine", nameEn: "German Shepherd", nameEs: "Pastor Alemán" },
  { id: "bulldog_french", speciesId: "canine", nameEn: "French Bulldog", nameEs: "Bulldog Francés" },
  { id: "bulldog_english", speciesId: "canine", nameEn: "English Bulldog", nameEs: "Bulldog Inglés" },
  { id: "poodle", speciesId: "canine", nameEn: "Poodle", nameEs: "Caniche" },
  { id: "beagle", speciesId: "canine", nameEn: "Beagle", nameEs: "Beagle" },
  { id: "rottweiler", speciesId: "canine", nameEn: "Rottweiler", nameEs: "Rottweiler" },
  { id: "yorkshire", speciesId: "canine", nameEn: "Yorkshire Terrier", nameEs: "Yorkshire Terrier" },
  { id: "boxer", speciesId: "canine", nameEn: "Boxer", nameEs: "Boxer" },
  { id: "dachshund", speciesId: "canine", nameEn: "Dachshund", nameEs: "Teckel" },
  { id: "siberian_husky", speciesId: "canine", nameEn: "Siberian Husky", nameEs: "Husky Siberiano" },
  { id: "shih_tzu", speciesId: "canine", nameEn: "Shih Tzu", nameEs: "Shih Tzu" },
  { id: "chihuahua", speciesId: "canine", nameEn: "Chihuahua", nameEs: "Chihuahua" },
  { id: "pomeranian", speciesId: "canine", nameEn: "Pomeranian", nameEs: "Pomerania" },
  { id: "schnauzer", speciesId: "canine", nameEn: "Schnauzer", nameEs: "Schnauzer" },
  { id: "cocker_spaniel", speciesId: "canine", nameEn: "Cocker Spaniel", nameEs: "Cocker Spaniel" },
  { id: "border_collie", speciesId: "canine", nameEn: "Border Collie", nameEs: "Border Collie" },
  { id: "pitbull", speciesId: "canine", nameEn: "Pitbull", nameEs: "Pitbull" },
  { id: "maltese", speciesId: "canine", nameEn: "Maltese", nameEs: "Maltés" },
  { id: "pug", speciesId: "canine", nameEn: "Pug", nameEs: "Pug" },
  { id: "great_dane", speciesId: "canine", nameEn: "Great Dane", nameEs: "Gran Danés" },
  { id: "doberman", speciesId: "canine", nameEn: "Doberman", nameEs: "Doberman" },
  { id: "cavalier", speciesId: "canine", nameEn: "Cavalier King Charles", nameEs: "Cavalier King Charles" },
  { id: "australian_shepherd", speciesId: "canine", nameEn: "Australian Shepherd", nameEs: "Pastor Australiano" },
  { id: "jack_russell", speciesId: "canine", nameEn: "Jack Russell Terrier", nameEs: "Jack Russell Terrier" },
  { id: "bichon_frise", speciesId: "canine", nameEn: "Bichon Frise", nameEs: "Bichón Frisé" },
  { id: "weimaraner", speciesId: "canine", nameEn: "Weimaraner", nameEs: "Weimaraner" },

  // Feline breeds
  { id: "mixed_cat", speciesId: "feline", nameEn: "Mixed Breed", nameEs: "Mestizo" },
  { id: "undefined_cat", speciesId: "feline", nameEn: "Undefined", nameEs: "Indefinido" },
  { id: "persian", speciesId: "feline", nameEn: "Persian", nameEs: "Persa" },
  { id: "siamese", speciesId: "feline", nameEn: "Siamese", nameEs: "Siamés" },
  { id: "maine_coon", speciesId: "feline", nameEn: "Maine Coon", nameEs: "Maine Coon" },
  { id: "ragdoll", speciesId: "feline", nameEn: "Ragdoll", nameEs: "Ragdoll" },
  { id: "british_shorthair", speciesId: "feline", nameEn: "British Shorthair", nameEs: "Británico de Pelo Corto" },
  { id: "bengal", speciesId: "feline", nameEn: "Bengal", nameEs: "Bengalí" },
  { id: "abyssinian", speciesId: "feline", nameEn: "Abyssinian", nameEs: "Abisinio" },
  { id: "scottish_fold", speciesId: "feline", nameEn: "Scottish Fold", nameEs: "Scottish Fold" },
  { id: "russian_blue", speciesId: "feline", nameEn: "Russian Blue", nameEs: "Azul Ruso" },
  { id: "sphynx", speciesId: "feline", nameEn: "Sphynx", nameEs: "Sphynx" },
  { id: "norwegian_forest", speciesId: "feline", nameEn: "Norwegian Forest", nameEs: "Bosque de Noruega" },
  { id: "burmese", speciesId: "feline", nameEn: "Burmese", nameEs: "Burmés" },
  { id: "exotic_shorthair", speciesId: "feline", nameEn: "Exotic Shorthair", nameEs: "Exótico de Pelo Corto" },

  // Equine breeds
  { id: "mixed_horse", speciesId: "equine", nameEn: "Mixed", nameEs: "Mestizo" },
  { id: "quarter_horse", speciesId: "equine", nameEn: "Quarter Horse", nameEs: "Cuarto de Milla" },
  { id: "thoroughbred", speciesId: "equine", nameEn: "Thoroughbred", nameEs: "Pura Sangre" },
  { id: "arabian", speciesId: "equine", nameEn: "Arabian", nameEs: "Árabe" },
  { id: "appaloosa", speciesId: "equine", nameEn: "Appaloosa", nameEs: "Appaloosa" },
  { id: "mustang", speciesId: "equine", nameEn: "Mustang", nameEs: "Mustang" },
  { id: "clydesdale", speciesId: "equine", nameEn: "Clydesdale", nameEs: "Clydesdale" },
  { id: "friesian", speciesId: "equine", nameEn: "Friesian", nameEs: "Frisón" },
  { id: "paso_fino", speciesId: "equine", nameEn: "Paso Fino", nameEs: "Paso Fino" },
  { id: "peruvian_paso", speciesId: "equine", nameEn: "Peruvian Paso", nameEs: "Caballo Peruano de Paso" },
  { id: "criollo", speciesId: "equine", nameEn: "Criollo", nameEs: "Criollo" },

  // Bovine breeds
  { id: "holstein", speciesId: "bovine", nameEn: "Holstein", nameEs: "Holstein" },
  { id: "angus", speciesId: "bovine", nameEn: "Angus", nameEs: "Angus" },
  { id: "hereford", speciesId: "bovine", nameEn: "Hereford", nameEs: "Hereford" },
  { id: "jersey", speciesId: "bovine", nameEn: "Jersey", nameEs: "Jersey" },
  { id: "brahman", speciesId: "bovine", nameEn: "Brahman", nameEs: "Brahman" },
  { id: "charolais", speciesId: "bovine", nameEn: "Charolais", nameEs: "Charolais" },
  { id: "simmental", speciesId: "bovine", nameEn: "Simmental", nameEs: "Simmental" },

  // Avian breeds
  { id: "parakeet", speciesId: "avian", nameEn: "Parakeet", nameEs: "Periquito" },
  { id: "cockatiel", speciesId: "avian", nameEn: "Cockatiel", nameEs: "Cacatúa Ninfa" },
  { id: "canary", speciesId: "avian", nameEn: "Canary", nameEs: "Canario" },
  { id: "parrot_amazon", speciesId: "avian", nameEn: "Amazon Parrot", nameEs: "Loro Amazona" },
  { id: "macaw", speciesId: "avian", nameEn: "Macaw", nameEs: "Guacamayo" },
  { id: "cockatoo", speciesId: "avian", nameEn: "Cockatoo", nameEs: "Cacatúa" },
  { id: "lovebird", speciesId: "avian", nameEn: "Lovebird", nameEs: "Agapornis" },
  { id: "finch", speciesId: "avian", nameEn: "Finch", nameEs: "Pinzón" },
  { id: "chicken", speciesId: "avian", nameEn: "Chicken", nameEs: "Gallina" },

  // Rabbit breeds
  { id: "mixed_rabbit", speciesId: "rabbit", nameEn: "Mixed", nameEs: "Mestizo" },
  { id: "holland_lop", speciesId: "rabbit", nameEn: "Holland Lop", nameEs: "Holland Lop" },
  { id: "netherland_dwarf", speciesId: "rabbit", nameEn: "Netherland Dwarf", nameEs: "Enano Holandés" },
  { id: "mini_rex", speciesId: "rabbit", nameEn: "Mini Rex", nameEs: "Mini Rex" },
  { id: "flemish_giant", speciesId: "rabbit", nameEn: "Flemish Giant", nameEs: "Gigante de Flandes" },
  { id: "angora_rabbit", speciesId: "rabbit", nameEn: "Angora", nameEs: "Angora" },

  // Rodent breeds
  { id: "hamster_syrian", speciesId: "rodent", nameEn: "Syrian Hamster", nameEs: "Hámster Sirio" },
  { id: "hamster_dwarf", speciesId: "rodent", nameEn: "Dwarf Hamster", nameEs: "Hámster Enano" },
  { id: "guinea_pig", speciesId: "rodent", nameEn: "Guinea Pig", nameEs: "Cobaya" },
  { id: "chinchilla", speciesId: "rodent", nameEn: "Chinchilla", nameEs: "Chinchilla" },
  { id: "gerbil", speciesId: "rodent", nameEn: "Gerbil", nameEs: "Jerbo" },
  { id: "mouse", speciesId: "rodent", nameEn: "Mouse", nameEs: "Ratón" },
  { id: "rat", speciesId: "rodent", nameEn: "Rat", nameEs: "Rata" },

  // Reptile types
  { id: "iguana", speciesId: "reptile", nameEn: "Iguana", nameEs: "Iguana" },
  { id: "gecko_leopard", speciesId: "reptile", nameEn: "Leopard Gecko", nameEs: "Gecko Leopardo" },
  { id: "bearded_dragon", speciesId: "reptile", nameEn: "Bearded Dragon", nameEs: "Dragón Barbudo" },
  { id: "ball_python", speciesId: "reptile", nameEn: "Ball Python", nameEs: "Pitón Bola" },
  { id: "corn_snake", speciesId: "reptile", nameEn: "Corn Snake", nameEs: "Serpiente del Maíz" },
  { id: "turtle_red_eared", speciesId: "reptile", nameEn: "Red-Eared Slider", nameEs: "Tortuga de Orejas Rojas" },
  { id: "tortoise", speciesId: "reptile", nameEn: "Tortoise", nameEs: "Tortuga de Tierra" },
  { id: "chameleon", speciesId: "reptile", nameEn: "Chameleon", nameEs: "Camaleón" },

  // Exotic
  { id: "ferret", speciesId: "exotic", nameEn: "Ferret", nameEs: "Hurón" },
  { id: "hedgehog", speciesId: "exotic", nameEn: "Hedgehog", nameEs: "Erizo" },
  { id: "sugar_glider", speciesId: "exotic", nameEn: "Sugar Glider", nameEs: "Petauro del Azúcar" },
  { id: "mini_pig", speciesId: "exotic", nameEn: "Mini Pig", nameEs: "Mini Cerdo" },

  // Other
  { id: "other_species", speciesId: "other", nameEn: "Other", nameEs: "Otro" },
];

// Helper function to get breeds for a specific species
export function getBreedsForSpecies(speciesId: string): Breed[] {
  return BREEDS.filter((breed) => breed.speciesId === speciesId);
}

// Helper function to get species by ID
export function getSpeciesById(speciesId: string): Species | undefined {
  return SPECIES.find((species) => species.id === speciesId);
}

// Helper function to get breed by ID
export function getBreedById(breedId: string): Breed | undefined {
  return BREEDS.find((breed) => breed.id === breedId);
}

// Helper function to search species by name
export function searchSpecies(query: string, locale: "en" | "es" = "es"): Species[] {
  const lowerQuery = query.toLowerCase();
  return SPECIES.filter((species) => {
    const name = locale === "en" ? species.nameEn : species.nameEs;
    return name.toLowerCase().includes(lowerQuery);
  });
}

// Helper function to search breeds by name (within a species)
export function searchBreeds(
  query: string,
  speciesId?: string,
  locale: "en" | "es" = "es"
): Breed[] {
  const lowerQuery = query.toLowerCase();
  let breeds = speciesId ? getBreedsForSpecies(speciesId) : BREEDS;

  return breeds.filter((breed) => {
    const name = locale === "en" ? breed.nameEn : breed.nameEs;
    return name.toLowerCase().includes(lowerQuery);
  });
}
