class ImportModel:
    def __init__(self, expected_columns: dict):
        self.expected_columns = expected_columns
        self.expected_keys = {k.lower() for k in expected_columns.keys()}

    def validate_columns(self, df_columns: set) -> None:
        if not self.expected_keys.issubset(df_columns):
            missing = self.expected_keys - df_columns
            raise ValueError(f"Colunas obrigatórias faltando: {', '.join(missing)}")