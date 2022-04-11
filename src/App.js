import './App.css';

function App() {
  return (
    <div className='bg-stone-200'>
      <div className="container1 p-8  w-full md:w-full mx-auto bg-stone-200">
        <div className="nav  container mx-auto top-0 flex h-14  items-center p-4 drop-shadow-md">
          <div className="left flex-1 w-14">
            <div className="logo"><img src="./logotipo.png" alt="logotipo" className="h-12 w-auto"/></div>
          </div>
          <div className="right flex-1 flex">
            <div className="flex-auto text-center bg-white rounded-lg p-2 m-2 w-24">Home</div>
            <div className="flex-auto text-center bg-white rounded-lg p-2 m-2 w-24">Sobre</div>
            <div className="flex-auto text-center bg-white rounded-lg p-2 m-2 w-24">Serviços</div>
            <div className="flex-auto text-center bg-white rounded-lg p-2 m-2 w-24">Contactos</div>
          </div>
        </div>
        <div className="hero w-full h-96 md:w-full mt-8 align-middle flex">
        </div>
      </div>
      <div className="new-container p-8 max-w-screen-xl w-full md:w-full mx-auto ">
        <div className='sobre-nos'>
          <h1 className='text-gray-800 text-4xl text-center'>Sobre Nós</h1>
          <p className='text-justify pt-8'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, assumenda et ipsa beatae vero vel consequatur fugit suscipit debitis quo repudiandae voluptates deleniti voluptate rerum eveniet laboriosam, libero ea. Natus!<br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus natus odio ab, corrupti eum id aliquam sint perspiciatis ipsum incidunt voluptatum illum recusandae dicta nisi quam voluptates consequatur nam hic!
          </p>
        </div>
      </div>
      <div className="hero1 w-full h-96 md:w-full mt-8 align-middle flex">
      </div>
      <div className="new-container p-8 max-w-screen-xl w-full md:w-full mx-auto">
        <div className='servicos'>
          <h1 className='text-gray-800 text-4xl text-center'>Serviços</h1>
          <p className='text-justify pt-8'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, assumenda et ipsa beatae vero vel cons/equatur fugit suscipit debitis quo repudiandae voluptates deleniti voluptate rerum eveniet laboriosam, libero ea. Natus!<br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus natus odio ab, corrupti eum id aliquam sint perspiciatis ipsum incidunt voluptatum illum recusandae dicta nisi quam voluptates consequatur nam hic!s
          </p>
        </div>
      </div>
      <div className="hero2 w-full h-96 md:w-full mt-8 align-middle flex">
      </div>
      <div className="new-container p-8 max-w-screen-xl w-full md:w-full mx-auto">
        <div className='portfolio'>
          <h1 className='text-gray-800 text-4xl text-center'>Portfolio</h1>
          <div className='cards flex-row flex gap-3 pt-8'>
            <div className='card bg-white basis-1/3 md:basis-1/2'>
              <img src='./portfolio/photocelos.jpg' alt='Photocelos'></img>
              <div className='card-content'>
                <div className='card-title text-xl text-green-800 text-center pt-5'>PhotoCelos</div>
                <div className='card-description text-black text-justify p-5'>Um website para ajudar as pessoas a descobrir o patrimonio Barcelos</div>
              </div>
            </div>
            <div className='card bg-white basis-1/3 md:basis-1/2'>
              <img src='./portfolio/motocavaquinho.png' alt='Motocavaquinhos'></img>
              <div className='card-content'>
                <div className='card-title text-xl text-green-800 text-center pt-5'>Motocavaquinhos</div>
                <div className='card-description text-black text-justify p-5'>Um website de uma associação de motociclistas de Barcelos</div>
              </div>
            </div>
            <div className='card bg-white basis-1/3 md:basis-1/2'>
              <img src='./portfolio/tecniwall.jpg' alt='tecniwall'></img>
              <div className='card-content'>
                <div className='card-title text-xl text-green-800 text-center pt-5'>Tecniwall</div>
                <div className='card-description text-black text-justify p-5'>Uma empresa especializada em fazer placas de gesso</div>
              </div>
            </div>
            <div className='card bg-white basis-1/3 md:basis-1/2'>
              <img src='./portfolio/belofer.png' alt='belofer'></img>
              <div className='card-content'>
                <div className='card-title text-xl text-green-800 text-center pt-5'>Belofer</div>
                <div className='card-description text-black text-justify p-5'>Uma empresa de comercio de maquinas e peças para a industria textil</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
}

export default App;
