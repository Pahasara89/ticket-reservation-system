import { Container, Row } from "react-bootstrap";
import "./Main.css";

const MainScreen = ({ tittle, children }) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {tittle && (
              <>
                <h1 className="heading">{tittle}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
