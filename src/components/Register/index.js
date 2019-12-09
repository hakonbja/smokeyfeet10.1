import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as Checkmark } from '../../assets/img/checkmark.svg';

const Register = (props) => {  

  const allPasses = [
    {
      name: "Full Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: true,
      lindyClasses: true,
      price: "€230,-"
    },
    {
      name: "Lindy Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: false,
      lindyClasses: true,
      price: "€210,-"
    },
    {
      name: "Solo Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: true,
      lindyClasses: false,
      price: "€145,-"
    },
    {
      name: "Party Pass",
      allParties: true,
      conceptClasses: true,
      soloClasses: false,
      lindyClasses: false,
      price: "€105,-"
    },
  ];

  if (props.isDesktop) {
    return <RegisterDesktop allPasses={allPasses}/>
  } else {
    return <RegisterMobile allPasses={allPasses}/>
  }
}

const RegisterDesktop = (props) => {
  return (
    <div className={styles.register}>
      <div className={`${styles.heading} blackBackground hideContent`}><h1>Register</h1></div>
      <RowHeaders />
      <CompareDesktop allPasses={props.allPasses}/>
      <RegButton />
    </div>
  );
}

const CompareDesktop = (props) => {
  const renderedPasses = props.allPasses.map((pass, i) => {
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
  const allPasses = props.allPasses;
  const [selectedPass, setSelectedPass] = useState(allPasses[0]);
    
  return (
    <div>
      <HeaderMobile selectedPass={selectedPass} setSelectedPass={setSelectedPass} allPasses={allPasses}/>
      <RowHeaders />
      <CompareMobile selectedPass={selectedPass}/>
      <RegButton />
    </div>
  );
}

const CompareMobile = (props) => {
  
  return (
    <PassInfo
      isDesktop={false}
      pass={props.selectedPass}
    />
  );
}

const HeaderMobile = (props) => {
  return (
    <div>
      <h1>Register</h1>
      <div>
        <ul>
          {props.allPasses.map((pass, i) => {
            const className = (props.selectedPass.name === pass.name) ? 'active': '';
            return (
              <li className={className} key={i} onClick={() => props.setSelectedPass(pass)}>{pass.name}</li>
            );
          })}
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
  if (props.pass) {
    return (
      <div className={styles.passInfo}>
        {props.isDesktop && <div><h2>{props.pass.name}</h2></div>}
        <div>{props.pass.allParties && <Checkmark/>}</div>
        <div>{props.pass.conceptClasses && <Checkmark/>}</div>
        <div>{props.pass.soloClasses && <Checkmark/>}</div>
        <div>{props.pass.lindyClasses && <Checkmark/>}</div>
        <div><h2>{props.pass.price}</h2></div>
      </div>
    );
  } else {
    return null;
  }
}


const RegButton = () => {
  return (
    <div className={`${styles.regButton} blackBackground hideContent`}>
      <h3>Registration opens on the 11th of January at 20:00</h3>
    </div>
  );
}

export default Register;