from usecases.imports.import_model import ImportModel
import pandas as pd
from database import db
from decimal import Decimal


class ImportSalesUsecase(ImportModel):
    def __init__(self):
        super().__init__(expected_columns={
            "id": int,
            "product_id": int,
            "quantity": int,
            "total_price": Decimal,
            "date": str
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

        # Converter coluna date para datetime
        df['date'] = pd.to_datetime(df['date']).dt.date

        try:
            with db.engine.begin() as connection:
                df.to_sql(
                    name="sales",
                    con=connection,
                    if_exists='append',
                    index=False,
                    method='multi',
                    chunksize=1000
                )
        except Exception as e:
            if 'unique constraint' in str(e).lower():
                raise ValueError("Erro de duplicação: Alguns IDs do arquivo já existem no banco de dados.")
            if 'foreign key' in str(e).lower() or 'integrity' in str(e).lower():
                raise ValueError("Erro de integridade: Verifique se todos os produtos referenciados existem.")
            raise e

        return len(df)