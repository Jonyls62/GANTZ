import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand " href="/">GANTZ</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto">
        <Link to="/sistema">sistema</Link>
      </div>
    </div>
  </div>
</nav>
    )
}

export default Navbar