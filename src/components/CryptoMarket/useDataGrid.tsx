import { useQuery } from "@tanstack/react-query";
import { getValuesByCriptoAndFiat } from "../../api/requests";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

type DataRows = {
  exchange: string;
  ask: number;
  totalAsk: number;
  bid: number;
  totalBid: number;
  id: string;
};

const useDataGrid = () => {
  const [crypto, setCrypto] = useState<string>("USDT");
  const [fiat, setFiat] = useState<string>("ARS");

  const {
    data,
    error,
    isLoading,
  }: { data: DataRows[] | undefined; error: Error | null; isLoading: boolean } =
    useQuery({
      queryKey: ["valuesByCryptoAndFiat", crypto, fiat],
      queryFn: () => getValuesByCriptoAndFiat(crypto, fiat),
      select: (data) => {
        const modifiedData = Object.entries<Record<string, number>>(data).map(
          ([exchange, values]): DataRows => ({
            id: uuidv4(),
            exchange,
            ask: values.ask,
            totalAsk: values.totalAsk,
            bid: values.bid,
            totalBid: values.totalBid,
          })
        );
        return modifiedData;
      },
    });

  const columns = [
    {
      field: "exchange",
      headerName: "Exchange",
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: ({ row }: { row: DataRows }) => {
        const exchange = row.exchange;
        console.log(row);
        return (
          <Box className="cellWithImg">
            <img src={"/" + exchange.toLowerCase() + ".png"} alt={exchange} />
            <Typography component="span">{exchange}</Typography>
          </Box>
        );
      },
    },
    {
      field: "ask",
      headerName: "Comprar",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalAsk",
      headerName: "Compra Total",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "bid",
      headerName: "Vender",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalBid",
      headerName: "Venta Total",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
  ];

  return {
    data,
    error,
    isLoading,
    columns,
    setCrypto,
    setFiat,
    crypto,
    fiat,
  };
};

export default useDataGrid;
