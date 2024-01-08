import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import "./CryptoMarket.scss";
import Loading from "../UI/Loading";
import useDataGrid from "./useDataGrid";

const CryptoMarket = () => {

  const {data, error, isLoading, crypto, setCrypto, fiat, setFiat, columns} = useDataGrid();
  
  return (
    <Box width="100%" mt={5} >
      <Typography variant="h5" component="h2">
        Seleccionar Cripto y Fiat
      </Typography>
      <Box display="flex" gap={3} mt={2}>
        <FormControl variant="filled">
          <InputLabel id="cripto">Cripto:</InputLabel>
          <Select
            name="crypto"
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            labelId="crypto"
          >
            <MenuItem value="USDT">USDT</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDC">USDC</MenuItem>
            <MenuItem value="DAI">DAI</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="fiat">Fiat:</InputLabel>
          <Select
            name="fiat"
            value={fiat}
            onChange={(e) => setFiat(e.target.value)}
            labelId="fiat"
          >
            <MenuItem value="ARS">ARS</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {isLoading && <Box position="relative" minHeight={"600px"}><Loading /></Box>}
      {error && <p>{error.message}</p>}
      {!error && data ? (
        <Box width="100%" className="table-container">
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
            },
          }}
          className="crypto-data-grid"
          sx={{
            border: "none",
            minWidth: "54rem",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
          density="comfortable"
          loading={isLoading}
          isRowSelectable={() => false}
          isCellEditable={() => false}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      ) : null}
    </Box>
  );
};

export default CryptoMarket;
