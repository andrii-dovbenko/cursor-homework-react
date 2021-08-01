import React, { useState } from 'react';
import './style.css'

const male = 'https://image.flaticon.com/icons/png/512/1340/1340619.png';
const female = 'https://image.flaticon.com/icons/png/512/766/766514.png';
const unknown = 'https://image.flaticon.com/icons/png/512/57/57108.png';
const user_icon = 'https://image.flaticon.com/icons/png/512/456/456212.png';

const contacts = [{
    id: 1,
    firstName: "Барней",
    lastName: "Стинсовський",
    phone: "+380956319521",
    gender: "male"
}, {
    id: 2,
    firstName: "Робін",
    lastName: "Щербатська",
    phone: "+380931460123",
    gender: "female"
}, {
    id: 3,
    firstName: "Анонімний",
    lastName: "Анонімус",
    phone: "+380666666666"
}, {
    id: 4,
    firstName: "Лілія",
    lastName: "Олдровна",
    phone: "+380504691254",
    gender: "female"
}, {
    id: 5,
    firstName: "Маршен",
    lastName: "Еріксонян",
    phone: "+380739432123",
    gender: "male"
}, {
    id: 6,
    firstName: "Теодор",
    lastName: "Мотсбес",
    phone: "+380956319521",
    gender: "male"
}];



function CheckboxFilter (props) {
    return(
        <div className="filter_box">
            <label htmlFor="male">
                <input 
                    onChange={props.onChange} 
                    type="checkbox" 
                    id="male" 
                    name="male" 
                    value="male"
                ></input>
            Male</label>
            <label htmlFor="female">
                <input 
                    onChange={props.onChange} 
                    type="checkbox" 
                    id="female" 
                    name="female" 
                    value="female"
                ></input>
            Female</label>
            <label htmlFor="not_specified">
                <input 
                    onChange={props.onChange} 
                    type="checkbox" 
                    id="not_specified" 
                    name="not_specified" 
                    value="undefined"
                ></input>
           Not specified</label><br/><br/>

        </div>
    )
}

function Contact(props) {
    return(
        <div className="contact_box">
            <div className="content_box_user">
                <img src={user_icon} className="user" alt="user"></img>
                <span>{`${props.contact.firstName} ${props.contact.lastName}`}</span>
                <img className="gender" src={props.contact.gender === "male" ? male : props.contact.gender === "female" ? female : unknown} alt="gender"></img>
            </div>
            <p>{props.contact.phone}</p>
            
            <hr/>
        </div> 
    )
}

function Contracts() {
    const [contactsArr, setContacts] = useState(contacts);

    const handleCheckbox = (e) => {
        const inputs = document.querySelectorAll('input[type="checkbox"]:checked')
        let checkedBoxes = [];
    
        inputs.forEach(input => {
                checkedBoxes.push(input.value)
        });
    
        const filteredContacts = contacts.filter(contact => {
            if (!contact.gender && checkedBoxes.includes("undefined")) {
                return true;
            }
            return checkedBoxes.includes(contact.gender);
        });
    
        setContacts(filteredContacts);
    }
    
    const handleSearchChange = (event) => {
        const regExp = new RegExp(event.target.value, 'gi');

        let filteredContacts = contacts.filter((contact => {
            let match = false;
    
            for ( let key in contact ) {
                if (contact[key].toString().search(regExp) >= 0) {
                    match = true;
                    break;
                }
            }

            return match; 
        }));

        setContacts(filteredContacts);
    }

    return(
        <div className="inner">
            <div className="container_hw18">
                <h2 className="title">Contacts</h2>
                <input className="search_input" placeholder="SEARCH" type="search" name="search" onChange={handleSearchChange}/>
                <CheckboxFilter onChange={handleCheckbox}/>
                {contactsArr.map(contact => 
                    <Contact key={contact.id} contact={contact}/>
                )}
            </div>
        </div>       
    )
        
}

export default Contracts;