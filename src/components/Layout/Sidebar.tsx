import { Link } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';

const Sidebar = () => {

    const options = [
      {
        title: 'Contact',
        path: '/',
        icon: <FaListUl className='h-5 w-5' />,
      },
      {
        title: 'Carts and maps',
        path: '/chart',
        icon: <BsBarChartFill className='h-5 w-5' />,
      },

    ];

    return (
      <div className=''>
        <div className='container m-auto'>
          <div className='mx-auto lg:mx-0'>
            <div className='lg:my-auto mx-auto lg:h-28 lg:w-40 flex'>
              <Link className='m-auto lg:block hidden' to="/">
                Dashboard
              </Link>
            </div>
            <div className={`my-auto col-span-2 lg:col-span-5`}>
              <ul className='py-5'>
                {options.map((item, index) => (
                  <Link key={index} to={item.path}>
                    <li className={`flex hover:text-gray-600 my-3 lg:mb-2 py-2 gap-2 lg:pl-8 rounded-l-full`}>
                      <span className={`my-auto mx-auto lg:mx-0`}>
                        {item.icon}
                      </span>
                      <span className='lg:block hidden'>
                      {item.title}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Sidebar;
