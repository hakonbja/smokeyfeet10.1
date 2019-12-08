import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as Checkmark } from '../../assets/img/checkmark.svg';

const Register = (props) => {

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

  if (props.isDesktop) {
    return <RegisterDesktop passesInfo={passesInfo}/>
  } else {
    return <RegisterMobile passesInfo={passesInfo}/>
  }
}

const RegisterDesktop = (props) => {
  return (
    <div className={styles.register}>
      <div className={`${styles.heading} blackBackground hideContent`}><h1>Register</h1></div>
      <RowHeaders />
      <CompareDesktop passesInfo={props.passesInfo}/>
      <RegButton />
    </div>
  );
}

const CompareDesktop = (props) => {
  const renderedPasses = props.passesInfo.map((pass, i) => {
    return(
      <PassInfo
        key={i}
        pass={pass}
        isDesktop={true}
      />
    );
  });

  return (
    <div className={`${styles.compareGrid} blackBackground hideContent`}>
      {renderedPasses}
    </div>
  );
}

const RegisterMobile = (props) => {
  const [selectedPass, setSelectedPass] = useState("Full Pass");  
  let selectedPassInfo = props.passesInfo.find(pass => pass.passName === selectedPass);

  return (
    <div>
      <HeaderMobile setSelectedPass={setSelectedPass}/>
      <RowHeaders />
      <CompareMobile selectedPassInfo={selectedPassInfo}/>
      <RegButton />
    </div>
  );
}

const CompareMobile = (props) => {
  return (
    <PassInfo
      isDesktop={false}
      pass={props.selectedPassInfo}
    />
  );
}

const HeaderMobile = (props) => {

  return (
    <div>
      <h1>Register</h1>
      <div>
        <ul>
          <li onClick={() => props.setSelectedPass("Full Pass")}>Full Pass</li>
          <li onClick={() => props.setSelectedPass("Lindy Pass")}>Lindy Pass</li>
          <li onClick={() => props.setSelectedPass("Solo Pass")}>Solo Pass</li>
          <li onClick={() => props.setSelectedPass("Party Pass")}>Party Pass</li>
        </ul>
      </div>
    </div>
  );
}

const RowHeaders = () => {
  return (
    <div className={`${styles.rowHeaders} hideContent`}>
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
      {props.isDesktop && <div><h2>{props.pass.passName}</h2></div>}
      <div>{props.pass.allParties && <Checkmark/>}</div>
      <div>{props.pass.conceptClasses && <Checkmark/>}</div>
      <div>{props.pass.soloClasses && <Checkmark/>}</div>
      <div>{props.pass.lindyClasses && <Checkmark/>}</div>
      <div><h2>{props.pass.price}</h2></div>
    </div>
  );
}


const RegButton = () => {
  return (
    <div className={`${styles.regButton} blackBackground hideContent`}>
      <h3>Registration opens on the 11th of January at 20:00</h3>
    </div>
  );
}

export default Register;