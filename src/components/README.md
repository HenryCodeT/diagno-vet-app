# Struktur Folder Komponen

Struktur folder untuk atoms, molecules, dan organisms terorganisir sebagai berikut:

## Jenis Gaya Penulisan

- **UPPERCASE**: Semua dengan huruf besar
- **lowercase**: Semua dengan huruf kecil
- **kebab-case**: Dipisahkan dengan hyphens (-)
- **dot.annotation**: Dipisahkan dengan dot (.)
- **PascalCase**: Diawali huruf besar dan Digabung dengan huruf besar
- **camelCase**: Diawali huruf kecil dan Digabung dengan huruf besar

## Gambaran Struktur Folder

```text
├── src/components/{atoms/molecules/organisms}
│   ├── Nama-Component // Camel-Kebab-Case
│   │   ├── components
│   │   │   ├── NamaKomponen1.tsx // PascalCase
│   │   │   └── NamaKomponen2.tsx // PascalCase
│   │   ├── constants
│   │   │   └── common.ts // camelCase
│   │   ├── hooks
│   │   │   └── use-fetch.ts // kebab-case
│   │   ├── services
│   │   │   ├── fetchListData.service.ts // camelCase + Dot Notation
│   │   │   ├── fetchData.service.ts // camelCase + Dot Notation
│   │   │   ├── realTimeData.service.ts // camelCase + Dot Notation
│   │   │   ├── actionUpdateData.service.ts // camelCase + Dot Notation
│   │   │   ├── actionDeleteData.service.ts // camelCase + Dot Notation
│   │   │   └── actionSaveData.service.ts // camelCase + Dot Notation
│   │   ├── store
│   │   │   └── index.ts // camelCase
│   │   ├── stories
│   │   │   ├── NamaKomponen1.stories.tsx // PascalCase + Dot Notation
│   │   │   └── NamaKomponen2.stories.tsx // PascalCase + Dot Notation
│   │   ├── styles
│   │   │   ├── namaKomponen1.style.ts // camelCase
│   │   │   └── namaKomponen2.style.ts // camelCase
│   │   ├── types
│   │   │   ├── NamaKomponen1.types.ts // PascalCase + Dot Notation
│   │   │   └── NamaKomponen2.types.ts // PascalCase + Dot Notation
│   │   └── utils
│   │       └── index.ts // lowercase
│   └── index.ts // Root
```
