/* jshint node: true */

/*

This file generates a JSON structure that can be served
with https://github.com/typicode/json-server to serve up a fake API
for the CSSP prototype.

Make sure you have json-server installed (npm install -g json server)
and that you also have installed further dependencies (by running 'npm install' in the project root)

To generate the API and serve it, please run '/generateEmployeesJSON.sh' in the 'app' directory.

*/


// Run `npm install in the project root to install these dependencies`
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const _ = require('lodash');

const api = {};
api.employees = [];
api.spouses = [];
api.children = [];
api.applications = [];
api.documents = [];
api.awards = [];
api.tccTuition = {
  'default': {
    'infant': {
      'twoDay': 1381,
      'threeDay': 1934,
      'fiveDay': 2760
    },
    'toddler': {
      'twoDay': 1160,
      'threeDay': 1617,
      'fiveDay': 2313
    },
    'preschool': {
      'twoDay': 979,
      'threeDay': 1368,
      'fiveDay': 1958
    }
  },
  'westgate': {
    'preschool': {
      'fiveDayMornings': 798,
      'fiveDay': 1595
    }
  },
  'linc': {
    'infant': {
      'twoDay': 1221,
      'threeDay': 1765,
      'fiveDay': 2524
    },
    'toddler': {
      'twoDay': 1092,
      'threeDay': 1584,
      'fiveDay': 2262
    },
    'preschool': {
      'twoDay': 921,
      'threeDay': 1353,
      'fiveDay': 1929
    }
  }
};

const mitId = function() {
  return faker.random.number({ min: 1000000000, max: 9999999999 });
};

const schools = ['College of the Holy Cross','University of California\, Davis','United States Coast Guard Academy','California Institute of Technology','Washington University in Saint Louis','Wheaton College','University of Texas\, Austin','Boston University','University of Pennsylvania','Trinity College','Northwestern University','Williams College','Santa Clara University','University of Southern California','University of California\, Berkeley','Case Western Reserve University','University of Maryland\, College Park','Harvard University','Southern Methodist University','University of Rochester','Davidson College','University of North Carolina\, Chapel Hill','Vassar College','Boston College','Sewanee—University of the South','Stanford University','Union College','University of California\, Los Angeles','Columbia University','Carleton College','Reed College','Kenyon College','University of Illinois\, Urbana-Champaign','Brandeis University','Tufts University','Rice University','Colgate University','Pepperdine University','University of California\, Santa Barbara','United States Air Force Academy','University of Washington','Villanova University','United States Naval Academy','Pennsylvania State University\, University Park','Washington and Lee University','Dartmouth College','Wellesley College','Oberlin College','George Washington University','Hamilton College','University of Michigan\, Ann Arbor','Grinnell College','Lehigh University','Duke University','United States Military Academy','Mount Holyoke College','University of Chicago','Princeton University','Wesleyan University','Georgetown University','University of Richmond','Bryn Mawr College','Lafayette College','Brown University','Vanderbilt University','Scripps College','DePauw University','Whitman College','Georgia Institute of Technology','Smith College','University of Notre Dame','Middlebury College','Harvey Mudd College','Amherst College','Barnard College','Virginia Military Institute','Yale University','New York University','Wake Forest University','Bowdoin College','University of Virginia','Johns Hopkins University','Haverford College','College of William and Mary','Swarthmore College','Cooper Union','University of Wisconsin\, Madison','Colby College','Cornell University','Brigham Young University','Carnegie Mellon University','Pomona College','Colorado College','University of Florida','Indiana University\, Bloomington','Centre College','Franklin and Marshall College','Macalester College','University of Georgia','Massachusetts Institute of Technology'];


// Employee Constructor
const Employee = (index) => {
  for (let id = 0; id < 50; id++) {
    const employee = {};
    employee.id = index; // for API route use - employees/:id
    employee.firstName = faker.name.firstName();
    employee.middleInitial = faker.random.boolean() ?
                              faker.name.firstName().substr(0,1) :
                              null;
    employee.lastName = faker.name.lastName();
    employee.maritalStatus = faker.random.arrayElement(['married','partnership','divorced','singleOrWidowed']);

    if (employee.maritalStatus === 'married') {
      employee.spouseMaritalTitle = 'spouse';
    } else if (employee.maritalStatus === 'partnership') {
      employee.spouseMaritalTitle = 'partner';
    } else if (employee.maritalStatus === 'divorced') {
      employee.spouseMaritalTitle = 'ex-spouse';
    }

    employee.email = employee.firstName.substr(0,1).toLowerCase() +
                     '.' +
                     employee.lastName.toLowerCase() +
                     '@' +
                     faker.internet.domainName();
    employee.phone = faker.phone.phoneNumberFormat();
    employee.isPrimaryContact = true; //spouse might override
    employee.salary = faker.random.number({min: 30000, max: 120000});
    employee.additionalIncome = faker.random.boolean() ? faker.random.number({min: 0, max: 20000}) : null;
    employee.affiliation = faker.random.arrayElement(['faculty','staff','student','postdoc associate','postdoc fellow']);
    employee.mitId = mitId();
    employee.childIds = [];
    employee.fundingSource = faker.random.arrayElement(['employee', 'fellow', 'combined']); // Determines which funds get used and which admin applications get sent to
    employee.applicationIds = [];

    return employee;
  }
};

// Spouse Constructor
const Spouse = (employee) => {
  const spouse = {};
  spouse.id = api.spouses.length;
  spouse.firstName = faker.name.firstName();
  spouse.middleInitial = faker.random.boolean() ?
                            faker.name.firstName().substr(0,1) :
                            null;
  spouse.lastName = faker.name.lastName();

  spouse.email = spouse.firstName.substr(0,1).toLowerCase() +
                   '.' +
                   spouse.lastName.toLowerCase() +
                   '@' +
                   faker.internet.domainName();
  spouse.phone = faker.phone.phoneNumberFormat();
  // Lets say 80% of spouses are employed
  spouse.occupation = (Math.random() < 0.2) ?
                        'employed' :
                        faker.random.arrayElement([
                          'student',
                          'self-employed',
                          'disabled',
                          'other'
                        ]);


  switch(spouse.occupation) {
    // EMPLOYED
    case 'employed':
      spouse.employer = faker.company.companyName();
      spouse.appointmentStartDate = faker.date.between(
        moment().subtract(8,'weeks'),
        moment().subtract(15,'years')
      );
      if ( Math.random() < 0.2 ) {
        spouse.appointmentEndDate = faker.date.between(
          moment().add(8, 'weeks'),
          moment().add(3, 'years')
        );
      }
      spouse.isEmployedOverMinimum = (Math.random() < 0.2) ? false : true;
      spouse.spousePaymentSchedule = faker.random.arrayElement(['monthly','semi-monthly','bi-weekly','weekly','per diem','irregularly']);
    break;

    // STUDENT
    case 'student':
      spouse.school = faker.random.arrayElement(schools);

      function generateSchoolAdmissionDate() {
        const year = faker.random.arrayElement(2015,2016,2017,2018);
        return moment().set({'year': year,'month':8,'date':1}).valueOf();
      }

      spouse.schoolAdmissionDate = generateSchoolAdmissionDate();

      spouse.schoolExpectedGraduationDate =
      moment(spouse.schoolAdmissionDate).add(4,'years').valueOf();

      spouse.schoolFundingType = faker.random.arrayElement(['teaching assistant','research assistant','stipend','N/A']);

    break;

    // SELF EMPLOYED
    case 'self-employed':
      spouse.selfEmploymentCompanyName = faker.company.companyName();
      spouse.selfEmploymentStartDate = faker.date.between(
        moment().subtract(8,'weeks'),
        moment().subtract(15,'years')
      );
      spouse.selfEmploymentPaymentSchedule = faker.random.arrayElement(['monthly','semi-monthly','bi-weekly','weekly','per diem','irregularly']);

      if (spouse.selfEmploymentPaymentSchedule === 'per diem' || spouse.selfEmploymentPaymentSchedule === 'irregularly') {
        spouse.selfEmploymentPaymentScheduleReason = 'I have my reasons';
      }

    break;
    case 'disabled':
    spouse.disabledCertification = "certification.pdf";
    break;
    case 'other':
    spouse.otherEmployeeNote = 'My partner has been seeking employment, but is currently unemployed.';
    spouse.otherAttachedFile = faker.random.boolean() ? 'attachedfile.pdf' : null;
    break;
  }

  spouse.salary = faker.random.number({min: 15000, max: 45000});
  spouse.additionalIncome = faker.random.boolean() ? faker.random.number({min: 0, max: 10000}) : null;
  // return an MIT ID ~20% of times when employed
  spouse.mitId = (Math.random() < 0.2 && spouse.occupation === 'employed') ?
                            mitId() :
                            null;
  spouse.employeeId = employee.id;

  return spouse;
};


function Child(employee, tccCenter) {

    var child = {};
    child.id = api.children.length;
    child.firstName = faker.name.firstName();
    child.lastName = employee.lastName;
    child.tccCenter = tccCenter;
    child.classRoom = faker.random.arrayElement(['Infant', 'Toddler', 'Preschool']);
    child.daysPerWeek = faker.random.arrayElement([2,3,5]);
    child.employeeId = employee.id;

    if (tccCenter.toLowerCase() === 'westgate') {
      child.schedule = faker.random.arrayElement(['full-time', 'half-time']);
      child.classRoom = 'Preschool';
      child.daysPerWeek = 5;
    }

    switch(child.classRoom.toLowerCase()) {
      case 'infant':
        child.dateOfBirth = faker.date.between(
          moment().subtract(8,'weeks'),
          moment().subtract(14,'months')
        );
      break;
      case 'toddler':
        child.dateOfBirth = faker.date.between(
          moment().subtract(14,'months').subtract(1, 'day'),
          moment().subtract(2.8,'years')
        );
      break;
      case 'preschool':
        child.dateOfBirth = faker.date.between(
          moment().subtract(2.8,'years').subtract(1, 'day'),
          moment().subtract(6,'years')
        );
      break;
      default:
        console.log('No valid classroom has been selected. The value must match \'infant\',\'toddler\', or \'preschool\'');
    }

      if (child.tccCenter.toLowerCase() === 'westgate') {
        if (child.schedule.toLowerCase() === 'half-time') {
         child.monthlyTuition = api.tccTuition.westgate.preschool.fiveDayMornings;
        } else {
         child.monthlyTuition = api.tccTuition.westgate.preschool.fiveDay;
       }
     } else if (child.tccCenter.toLowerCase() === 'linc') {
       if (child.classRoom.toLowerCase() === 'infant') {
         if (child.daysPerWeek === 2) {
           child.monthlyTuition = api.tccTuition.linc.infant.twoDay;
         }
         if (child.daysPerWeek === 3) {
           child.monthlyTuition = api.tccTuition.linc.infant.threeDay;
         }
         if (child.daysPerWeek === 5) {
           child.monthlyTuition = api.tccTuition.linc.infant.fiveDay;
         }
       }
       if (child.classRoom.toLowerCase() === 'toddler') {
         if (child.daysPerWeek === 2) {
           child.monthlyTuition = api.tccTuition.linc.toddler.twoDay;
         }
         if (child.daysPerWeek === 3) {
           child.monthlyTuition = api.tccTuition.linc.toddler.threeDay;
         }
         if (child.daysPerWeek === 5) {
           child.monthlyTuition = api.tccTuition.linc.toddler.fiveDay;
         }
       }
       if (child.classRoom.toLowerCase() === 'preschool') {
         if (child.daysPerWeek === 2) {
           child.monthlyTuition = api.tccTuition.linc.preschool.twoDay;
         }
         if (child.daysPerWeek === 3) {
           child.monthlyTuition = api.tccTuition.linc.preschool.threeDay;
         }
         if (child.daysPerWeek === 5) {
           child.monthlyTuition = api.tccTuition.linc.preschool.fiveDay;
         }
       }
     } else {
       // default: stata, eastgate, koch
       if (child.classRoom.toLowerCase() === 'infant') {
         if (child.daysPerWeek === 2) {
           child.monthlyTuition = api.tccTuition.default.infant.twoDay;
         }
         if (child.daysPerWeek === 3) {
           child.monthlyTuition = api.tccTuition.default.infant.threeDay;
         }
         if (child.daysPerWeek === 5) {
           child.monthlyTuition = api.tccTuition.default.infant.fiveDay;
         }
       }
       if (child.classRoom.toLowerCase() === 'toddler') {
         if (child.daysPerWeek === 2) {
           child.monthlyTuition = api.tccTuition.default.toddler.twoDay;
         }
         if (child.daysPerWeek === 3) {
           child.monthlyTuition = api.tccTuition.default.toddler.threeDay;
         }
         if (child.daysPerWeek === 5) {
           child.monthlyTuition = api.tccTuition.default.toddler.fiveDay;
         }
       }
       if (child.classRoom.toLowerCase() === 'preschool') {
         if (child.daysPerWeek === 2) {
           child.monthlyTuition = api.tccTuition.default.preschool.twoDay;
         }
         if (child.daysPerWeek === 3) {
           child.monthlyTuition = api.tccTuition.default.preschool.threeDay;
         }
         if (child.daysPerWeek === 5) {
           child.monthlyTuition = api.tccTuition.default.preschool.fiveDay;
         }
       }
     }

      return child;

}

/* APPLICATION CONSTRUCTOR */
const Application = (employee) => {
 const application = {};
 application.id = api.applications.length;
 // @TODO Since the application can be returned and resubmitted, does it make sense to store this in an array on this property? Should research best practices
 application.lastSubmissionDate = faker.date.between('2018-08-01','2018-09-15');
 application.submissionDates = [].concat([application.lastSubmissionDate]);
 application.academicYear = (Math.random() > 0.2) ?
                               '2018-19' :
                              '2017-18'; //How would you store AY in an API? academicYearStart and academicYearEnd with two udate objects maybe?
 application.statusCode = faker.random.number({ min: 0, max: 5 });

 application.statusMessage = ['Pending Approval','Approved','Returned','Denied','Confirmed','Declined'][application.statusCode]; // Corresponds to statusCode
 application.employeeId = employee.id;

 // application.financialDocumentation = [];
 //
 // if (employee.spouseId) {
 //   application.financialDocumentation.spouseTaxForm
 // }

 return application;
};

const GenerateAwards = () => {
  const award = {};
  // award.startDate = faker.date.between('','2018-08-31');
  // award.EndDate = faker.date.between('','2018-08-31');
};

const removeKeysWithEmptyProperties = (obj) => {
  Object.keys(obj).forEach(key => {
    // Add recursion for nested objects
    if (obj[key] && typeof obj[key] === 'object') removeKeysWithEmptyProperties(obj[key]);
    else if (obj[key] == null) delete obj[key];
  });
};


const writeObjectToJsonFile = (obj, jsonFileName) => {

  var objJson = JSON.stringify(obj);
  fs.writeFile(jsonFileName + '.json', objJson, 'utf-8', function(err) {
    if (err) {
      console.log('An error occured while writing JSON object to file. 🤬 💩 ');
      return console.log(err);
    }

    console.log(jsonFileName + '.json has been saved... 👍');
  });
};


/*** MAIN ROUTINE ***/
(() => {
  // Generate n employees
  _.times(50, function(index){
      api.employees.push(Employee(index));
  });

  // Now that we have the api.employees, populate  api.spouses and api.children  with realistic variability (possibility, not probability) so prototype will reveal the possible scenarios.

  api.employees.forEach(function(employee, index) {
    // SPOUSE
        if (employee.maritalStatus !== 'singleOrWidowed') {
          api.spouses.push(Spouse(employee));
          // Create an ID reference on the employee to the spouse
          employee.spouseId = api.spouses.length - 1;
          // Determine who is primary contact
          employee.isPrimaryContact = faker.random.boolean();
        }




    // CHILDREN
    // One to four little paycheck annihilators...
    // Fewer children much more likely

    const randomNumber = Math.random();
    let numberOfChildren;

    if (randomNumber < 0.5) {
      numberOfChildren = 1;
    } else if (randomNumber < 0.85) {
      numberOfChildren = 2;
    } else if (randomNumber < 0.95) {
      numberOfChildren = 3;
    } else {
      numberOfChildren = 4;
    }

    // ...going to the same TCC. (Technically possible it's different, realistically it's unlikely. Also not important for the prototype?)
    const tccCenter = faker.random.arrayElement(['Eastgate','Westgate','Koch','Stata','Linc']);

    _.times(numberOfChildren, () => {
      api.children.push(Child(employee,tccCenter));
      //Create array of ChildId references on the employee
      employee.childIds.push(api.children.length - 1);
    });
  });

  // Add n applications to random employees
  _.times(200, (index) => {
    const randomEmployeesArrayIndex = faker.random.number({ min: 0, max: api.employees.length - 1});

    const employee = api.employees[randomEmployeesArrayIndex];

    api.applications.push(Application(employee));
    // Create an ID array element on the employee referencing the application
    employee.applicationIds.push(index);
  });

  // Order applications
  api.applications = _.sortBy(api.applications, function(application) {
    return new Date(application.lastSubmissionDate);
  });

  // add ordinal orderIndex property for pending Approval applications
  (function(){
    let index = 0;
    api.applications.forEach(function(application){
      if (application.statusCode === 0)
      application.orderIndex = index++;
    });
  }());


removeKeysWithEmptyProperties(api);
writeObjectToJsonFile(api,'api');

})();
