'use client';

import withAuth from '../../hocs/withAuth';

// export const metadada: Metadata = {
//   ...NO_INDEX_PAGE,
// };

const adminPage = () => {
  return <p>dashboard</p>;
};

export default withAuth(adminPage, ['director']);
