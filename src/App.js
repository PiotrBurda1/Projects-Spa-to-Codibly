import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Error from "./components/Error";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const App = () => {
  const [data, setData] = useState([]);
  const [urlData, setUrlData] = useState({ page: 1, perPage: 5, lastPage: "" });
  const [filteredData, setFilteredData] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://reqres.in/api/products?page=${urlData.page}&per_page=${urlData.perPage}`
      );

      setUrlData({ ...urlData, lastPage: data.total_pages });
      setData(data.data);
      if (!!searchValue) {
        searchById(searchValue, data.data);
      }
    } catch (error) {
      alert("Error 404");
    }
  };
  useEffect(() => {
    getData();
  }, [urlData.page]);
  if (!data.length) {
    return <Error />;
  }

  const searchById = (id, searchDataById = data) => {
    const searchData = searchDataById.filter(
      (data) => data.id === Number(`${id}`)
    );
    setFilteredData(searchData);
  };

  const handleChange = (event, value) => {
    setUrlData({ ...urlData, page: value });
  };
  return (
    <div className="wrapper">
      <h1 className="welcome">
        <span>W</span>
        <span>E</span>
        <span>L</span>
        <span>C</span>
        <span>O</span>
        <span>M</span>
        <span>E</span>
        <span>
          <br></br>
        </span>
        <span>I</span>
        <span>N</span>
        <span> </span>
        <span>S</span>
        <span>P</span>
        <span>A</span>
      </h1>

      <div className="container">
        <div className="container__item">
          <form className="form">
            <input
              type="number"
              className="form__field"
              placeholder="Search by id..."
              onChange={(e) => setSearchValue(e.currentTarget.value)}
            />
            <button
              type="button"
              className="btn btn--primary btn--inside uppercase"
              onClick={() => searchById(searchValue)}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="tabled">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">name</StyledTableCell>
                <StyledTableCell align="right">year</StyledTableCell>
                <StyledTableCell align="right">color</StyledTableCell>
                <StyledTableCell align="right">pantone_value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!filteredData ? data : filteredData).map((data) => (
                <StyledTableRow key={data.id}>
                  <StyledTableCell component="th" scope="row">
                    {data.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{data.name}</StyledTableCell>
                  <StyledTableCell align="right">{data.year}</StyledTableCell>
                  <StyledTableCell align="right" style={{backgroundColor: `${data.color}`}}></StyledTableCell>
                  <StyledTableCell align="right">
                    {data.pantone_value}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} className="pagination">
          <Pagination count={urlData.lastPage} onChange={handleChange} />
        </Stack>
      </div>
      <div className="footer">
        <h5>
          &copy; {new Date().getFullYear()}
          <span>SPA</span>
        </h5>
        <h5>'All right reserved</h5>
      </div>
    </div>
  );
};
export default App;
