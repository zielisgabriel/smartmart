from usecases.imports.import_model import ImportModel
import pandas as pd
from database import db


class ImportCategoriesUsecase(ImportModel):
    def __init__(self):
        super().__init__(expected_columns={
            "id": int,
            "name": str
        })

    def execute(self, file):
        df = pd.read_csv(file)
        df.columns = df.columns.str.strip().str.lower()
        csv_columns = set(df.columns)

        self.validate_columns(csv_columns)

        cols_to_keep = list(self.expected_keys)
        df = df[cols_to_keep]

        if df.isnull().any().any():
            raise ValueError("Existem células vazias no arquivo. Todos os campos são obrigatórios.")

        try:
            with db.engine.begin() as connection:
                df.to_sql(
                    name="categories",
                    con=connection,
                    if_exists='append',
                    index=False,
                    method='multi',
                    chunksize=1000
                )
        except Exception as e:
            if 'unique constraint' in str(e).lower():
                raise ValueError("Erro de duplicação: Alguns IDs do arquivo já existem no banco de dados.")
            raise e

        return len(df)
