import React from 'react';
import styles from './styles.module.scss';
import { ReactComponent as Checkmark } from '../../assets/img/checkmark.svg';

const Register = () => {
  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <PassesTable />
    </div>
  );
}

const PassesTable = () => {
  return (
    <div className={styles.compareTable}>
      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>Full Pass</th>
            <th>Lindy Pass</th>
            <th>Solo Pass</th>
            <th>Party Pass</th>
          </tr>
          <tr>
            <th>All Parties</th>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
          </tr>
          <tr>
            <th>Concept Classes</th>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
          </tr>
          <tr>
            <th>Solo Classes</th>
            <td><Checkmark/></td>
            <td>&nbsp;</td>
            <td><Checkmark/></td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th>Lindy Classes</th>
            <td><Checkmark/></td>
            <td><Checkmark/></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>€230,-</td>
            <td>€210,-</td>
            <td>€145,-</td>
            <td>€105,-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Register;