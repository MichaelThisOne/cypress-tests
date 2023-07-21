mongoexport --uri="mongodb+srv://gro-local:v9J975haSBboZv66@gro.d2su6ry.mongodb.net/gro-local?retryWrites=true&w=majority" --collection=companies --out=db_dump/companies.json
mongoexport --uri="mongodb+srv://gro-local:v9J975haSBboZv66@gro.d2su6ry.mongodb.net/gro-local?retryWrites=true&w=majority" --collection=projects --out=db_dump/projects.json
mongoexport --uri="mongodb+srv://gro-local:v9J975haSBboZv66@gro.d2su6ry.mongodb.net/gro-local?retryWrites=true&w=majority" --collection=variations --out=db_dump/variations.json
mongoexport --uri="mongodb+srv://gro-local:v9J975haSBboZv66@gro.d2su6ry.mongodb.net/gro-local?retryWrites=true&w=majority" --collection=conversions --out=db_dump/conversions.json
