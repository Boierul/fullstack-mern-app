import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }) {
  return (
    <>
        <ul className='list-group'>
            <li className='list-group-item'>
                <FaIdBadge className='icon' style={{color: "#df3ca6"}}/> {client?.name}
            </li>
            <li className='list-group-item'>
                <FaEnvelope className='icon' style={{color: "#df3ca6"}}/> {client?.email}
            </li>
            <li className='list-group-item'>
                <FaPhone className='icon' style={{color: "#df3ca6"}}/> {client?.phone}
            </li>
        </ul>
    </>
  );
}
