import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        px: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "52px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: "error.main",
            fontSize: "1.8rem",
            fontWeight: 550,
            mb: "16px",
          }}
        >
          Oops! You encounter an error!
        </Typography>
        <Typography
          sx={{ color: "primary.main", fontSize: "1.2rem", fontWeight: 500 }}
        >
          {error.data || error.statusText || "Data is Not Found"}
        </Typography>
      </Box>
      {!window.location.pathname.includes("/access-management") &&
      !window.location.pathname.includes("/system-settings") ? (
        <Button
          component={Link}
          to="/"
          sx={{
            backgroundColor: "success.main",
            px: "20px",
            py: "12px",
            borderRadius: "20px",
            textTransform: "capitalize",
            lineHeight: "100%",
            color: "#fff",
            fontSize: "1rem",
            "&:hover": { backgroundColor: "success.main" },
          }}
        >
          Go back to Home Page
        </Button>
      ) : (
        ""
      )}
    </Container>
  );
}

export default ErrorPage;
