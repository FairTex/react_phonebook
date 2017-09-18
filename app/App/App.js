import React from 'react';
import { Form, Text } from 'react-form';

import { observer } from 'mobx-react';
import phonebook from 'app/phonebook';

require('./App.scss');

const App = observer(() => (
    <div className="container">
        <h2 className='title'>Телефонная книга</h2>
        <input type="text" placeholder="Поиск" onChange={(e) => phonebook.filter(e.target.value)}/>
        <table>
            <thead>
            <tr>
                <th onClick={() => phonebook.sortBy('phone')}>Номер телефона</th>
                <th onClick={() => phonebook.sortBy('name')}>ФИО</th>
                <th onClick={() => phonebook.sortBy('email')}>Email</th>
            </tr>
            </thead>
            <tbody>
            <Form onSubmit={(values) => phonebook.addContact(values)}
                  validate={({phone, name, email}) => ({
                      phone: !phone || !/(\+?\d[- .]*){7,13}/.test(phone) ? 'Неверный телефон' : undefined,
                      name: !name ? 'Введите имя' : undefined,
                      email: !email || !/@/.test(email) ? 'Неверный email' : undefined
                  })}
            >
                {
                    ({submitForm}) => <tr>
                        <td>
                            <Text
                                field="phone"
                                placeholder="Номер телефона"
                            />
                        </td>
                        <td>
                            <Text
                                field="name"
                                placeholder="ФИО"
                            />
                        </td>
                        <td>
                            <Text
                                field="email"
                                placeholder="email"
                            />
                            <button className="btn btn_add" onClick={submitForm}>Добавить</button>
                            <button className="btn btn_clear" onClick={() => phonebook.clear()}>Очистить все контакты</button>
                        </td>
                    </tr>
                }
            </Form>
            {
                phonebook.phonebook.map(contact =>
                    <tr key={contact.phone} className={contact.visible ? '' : 'hidden'}>
                        <td>
                            {contact.phone}
                        </td>
                        <td>
                            {contact.name}
                        </td>
                        <td>
                            {contact.email}
                            <a className="remove-contact" onClick={() => phonebook.removeContact(contact)}>remove</a>
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>

    </div>
));

export default App;
