import React from 'react';
import { connect } from 'react-redux';

import { stayInformationFromDates, formatDate } from '../util';

const Overstay = ({ from, to }) => {
  return (
    <li>
      You overstayed from{' '}
      <span className="highlight">{ formatDate(from) }</span>
      {' '}to{' '}
      <span className="highlight">{ formatDate(to) }</span>
    </li>
  );
};

const AllowableVisit = ({ from, to, maxStay }) => {
  if (to) {
    return (
      <li>
        If you return between{' '}
        <span className="highlight">{ formatDate(from) }</span>
        {' '}to{' '}
        <span className="highlight">{ formatDate(to) }</span>
        {' '}you can stay up to{' '}
        <span className="highlight">{ maxStay }</span>
        {' '}day{ maxStay !== 1 ? 's' : '' }
      </li>
    );
  } else {
    return (
      <li>
        If you return after{' '}
        <span className="highlight">{ formatDate(from) }</span>
        {' '}you can stay up to{' '}
        <span className="highlight">{ maxStay }</span>
        {' '}day{ maxStay !== 1 ? 's' : '' }
      </li>
    );
  }
}

const Calculations = ({ overstays, allowable }) => {
  function renderOverstays(overstays) {
    if (!overstays.length) { return null; }
    return (
      <div>
        Overstays:
        <ul>
          {overstays.map(overstay =>
            <Overstay {...overstay}/>
          )}
        </ul>
      </div>
    );
  }

  function renderAllowable(allowable) {
    if (!allowable.length) { return null; }
    return (
      <div>
        Allowed to return:
        <ul>
          {allowable.map(allowable =>
            <AllowableVisit {...allowable}/>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div>
      { renderOverstays(overstays) }
      { renderAllowable(allowable) }
    </div>
  );
}

const mapStateToProps = ({ visits, errors }) => {
  visits = visits.filter(v => {
    return !errors[v.id];
  });
  return stayInformationFromDates(visits) || { overstays: [], allowable: [] };
};

export default connect(mapStateToProps)(Calculations);
