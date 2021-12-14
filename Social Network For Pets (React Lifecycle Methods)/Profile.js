import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  // Lugar para guardar la data 
  constructor(props) {
    super(props);
    this.state = { userData: null };
  }
  // Lugar para cargar data
  loadUserData() {
    // Setea la data a null mientras la data esta cargando
    this.setState({userData: null}); 
    //Fetchea la data del usuario
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData });
    });
  }
  // Metodo para cuando el componente 'mounts'
  componentDidMount() {
    this.loadUserData(); // Actualiza la info del usuario
  }
  // Metodo para cuando el componente 'unmounts'
  componentWillUnmount() {
    cancelFetch(this.fetchID);
  }
  //Cuando cambio de perfil, no se fetchea nueva data, solo se updatea el username. Agrego un metodo que indica que sucede cuando hay un update
  componentDidUpdate(prevProps) {
    if(this.props.username !== prevProps.username) {
      // Cancelo el fetch en progreso para asegurarme
      cancelFetch(this.fetchID)
      // Nuevo (y correcto) fetch
      this.loadUserData();
    }
  }
  render() {
    const isLoading = this.state.userData === null;// Si la data del usuario es nula, es porque esta cargando
    // Display (como se ven) de los elementos del container
    let name, bio, friends;
    let className = 'Profile';
    // Cuanto la pagina este cargando, se tienen que mostrar valores que indiquen que lo esta haciendo
    if (isLoading) {
      className += ' loading';
      name = 'Loading...';
      bio = 'Bio goes here';
      friends = [];
    } 
    // Cuando no, se muestra el estado actual del componente para cada elemento
    else {
      name = this.state.userData.name;
      bio = this.state.userData.bio;
      friends = this.state.userData.friends;
    }

    return (
      <div className={className}>
        <div className="profile-picture">{!isLoading && (
    <img src={this.state.userData.profilePictureUrl} alt="" />
  )}</div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}