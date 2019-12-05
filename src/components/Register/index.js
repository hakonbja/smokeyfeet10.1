import React from 'react';
import styles from './styles.module.scss';
import { ReactComponent as Checkmark } from '../../assets/img/checkmark.svg';

const Register = () => {
  return (
    <div className={styles.register}>
      <div className={styles.heading}><h1>Register</h1></div>
      <RowHeaders />
      <CompareGrid />
      <RegButton />
    </div>
  );
}

const RegButton = () => {
  return (
    <div className={styles.regButton}>
      <h3>Registration opens on the 11th of January at 20:00</h3>
    </div>
  );
}

const RowHeaders = () => {
  return (
    <div className={styles.rowHeaders}>
      <div>
        <h2>All Parties</h2>
      </div>
      <div>
        <h2>Concept Classes</h2>
      </div>
      <div>
        <h2>Solo Classes</h2>
      </div>
      <div>
        <h2>Lindy Classes</h2>
      </div>
      <div>
        <h2>Price</h2>
      </div>
    </div>
  );
}

const PassInfo = (props) => { 
  return (
    <div className={styles.passInfo}>
      <div><h2>{props.name}</h2></div>
      <div>{props.allParties && <Checkmark/>}</div>
      <div>{props.conceptClasses && <Checkmark/>}</div>
      <div>{props.soloClasses && <Checkmark/>}</div>
      <div>{props.lindyClasses && <Checkmark/>}</div>
      <div><h2>{props.price}</h2></div>
    </div>
  );
}

const CompareGrid = () => {
  const passesInfo = [
    {
      passName: "Full Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: true,
      lindyClasses: true,
      price: "€230,-"
    },
    {
      passName: "Lindy Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: false,
      lindyClasses: true,
      price: "€210,-"
    },
    {
      passName: "Solo Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: true,
      lindyClasses: false,
      price: "€145,-"
    },
    {
      passName: "Party Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: false,
      lindyClasses: false,
      price: "€105,-"
    },
  ];

  const renderedPasses = passesInfo.map((pass, i) => {
    return(
      <PassInfo
        key={i}
        name={pass.passName}
        allParties={pass.allParties}
        conceptClasses={pass.conceptClasses}
        soloClasses={pass.soloClasses}
        lindyClasses={pass.lindyClasses}
        price={pass.price}
      />
    );
  });

  return (
    <div className={styles.compareGrid}>
      {renderedPasses}
    </div>
  );
}

export default Register;