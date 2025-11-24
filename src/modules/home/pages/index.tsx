import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Bem vindo ao centro de controle espacial</h1>
      <div>
        <Link to="/specialist-assistance">Ver paineis dos especialistas</Link>
      </div>
      <div>
        <Link to="/ticket/create">Adicionar novo ticket</Link>
      </div>
      <div>
        <Link to="/spaceship/create">Adicionar nova nave espacial</Link>
      </div>
      <div>
        <Link to="/receptionist">Ir a recepção</Link>
      </div>
    </>
  );
}
