import { Pagination } from "@mui/material";

interface paginationProps {
    page: number,
    setPage: any,
    totalPages: number,
    color: string,
}

export default function PaginationList(props: paginationProps) {
    
    const handleChangePage = (event: unknown, newPage: number) => {
        props.setPage(newPage)
    }

    return (
        <Pagination
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "#fff",
                    fontSize: "22px",
                },
                "& .Mui-selected": {
                bgcolor:`${props.color} !Important` ,
                },
            }}
            page={props.page}
            onChange={handleChangePage}
            showLastButton
            showFirstButton
            size="large"
            count={props.totalPages}
        />
    )
}