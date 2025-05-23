import { Outlet, redirect } from 'react-router';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { MobileSidebar, NavItems } from 'components';
import { account } from '~/appwrite/client';
import { getExistingUser, storeUserData } from '~/appwrite/auth';

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect('/sign-in');

    const exictingUser = await getExistingUser(user.$id);

    if (exictingUser?.status === 'user') {
      console.log('object');
      return redirect('/');
    }

    return exictingUser?.$id ? exictingUser : await storeUserData();
  } catch (e) {
    console.log('Error in clientLoader:', e);
    return redirect('/sign-in');
  }
}

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <MobileSidebar />
      <aside className='w-full max-w-[270px] hidden lg:block'>
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className='children'>
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
