import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function App() {
  const url = "https://localhost:5089";
  const [book, setBook] = useState({ id: 0, name: "none", properties: "none" });
  const [books, setBooks] = useState([]);
  const fetchData = async () => {
    const response = await fetch(`${url}/books`, {
      method: "GET",
    });
    const json = await response.json();
    setBooks(json);
  };
  useEffect(() => {
    fetchData();
  });

  const changeId = (event) => setBook({ ...book, id: event.target.value });
  const changeName = (event) => setBook({ ...book, name: event.target.value });
  const changeProperties = (event) =>
    setBook({ ...book, properties: event.target.value });
  
  const submit = (event) => {
    event.preventDefault();
    fetch(`${url}/Createbook`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Box
      sx={{
        display: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          alignContent: "center",
          backgroundColor: "white",
          display: "center",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <>
          {books.length > 0 && (
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Properties</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow
                        key={book.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {book.id}
                        </TableCell>
                        <TableCell align="center">{book.name}</TableCell>
                        <TableCell align="center">
                          {book.properties}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
        <Box
          sx={{
            width: 200,
            flexGrow: 1,
            backgroundColor: "white",
            display: "flow",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginLeft: 10,
          }}
        >
          <p margin={10}>
            <TextField
              type="Id"
              id="outlined-helperText"
              fullWidth
              label="Id"
              variant="outlined"
              margin="dense"
              onChange={changeId}
            />
            <TextField
              type="name"
              id="outlined-helperText"
              fullWidth
              label="name"
              variant="outlined"
              margin="dense"
              onChange={changeName}
            />
            <TextField
              type="properties"
              fullWidth
              label="properties"
              variant="outlined"
              margin="dense"
              onChange={changeProperties}
            />
          </p>
          <p align="right">
            <Button variant="contained" onClick={submit}>
              submit
            </Button>
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default App;