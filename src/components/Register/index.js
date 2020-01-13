import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className={styles.registerDesktop}>
      <HeaderDesktop />
      <RowHeaders isDesktop={true}/>
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
    <div className={`${styles.compareDesktop} blackBackground hideContent`}>
      {renderedPasses}
    </div>
  );
}

const HeaderDesktop = () => (
  <div className={`${styles.headerDesktop} blackBackground hideContent`}><h1>Register</h1></div>
);


const RegisterMobile = (props) => {
  const allPasses = props.allPasses;
  const [selectedPass, setSelectedPass] = useState(allPasses[0]);
    
  return (
    <div className={styles.registerMobile}>
      <HeaderMobile selectedPass={selectedPass} setSelectedPass={setSelectedPass} allPasses={allPasses}/>
      <CompareMobile selectedPass={selectedPass}/>
      <RegButton />
    </div>
  );
}

const HeaderMobile = (props) => {
  return (
    <div className={styles.headerMobile}>
      <h1>Register</h1>
      <div className={styles.passSelect}>
        <ul>
          {props.allPasses.map((pass, i) => {
            const isSelected = props.selectedPass.name === pass.name;
            const passName = pass.name.split(' ').join('<br>');
            return (
              <li
                className={isSelected ? styles.activeLi : ''}
                key={i}
                onClick={() => props.setSelectedPass(pass)}
                dangerouslySetInnerHTML={{__html: passName}}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const CompareMobile = (props) => (
  <div className={styles.compareWrapper}>
    <RowHeaders isDesktop={false}/>
    <PassInfo
      isDesktop={false}
      pass={props.selectedPass}
      />
  </div>
);

const RowHeaders = (props) => {
  return (
    <div className={`${props.isDesktop ? styles.rowHeadersDesktop : styles.rowHeadersMobile} hideContent`}>
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
    <div className={props.isDesktop ? styles.passInfoDesktop : styles.passInfoMobile}>
      {props.isDesktop && <div><h2>{props.pass.name}</h2></div>}
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
      <p>Registration opens <a href="https://tickets.smokeyfeet.com" target="_blank" rel="noopener noreferrer">here</a> on the 11th of January at 20:00 CET</p>
      <p>Read the <Link to="/registration-info">Registration Info</Link> carefully before registering</p>
    </div>
  );
}

export default Register;