import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  profileData: {
    header: {
      avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      username: 'Kitty Allanson',
      designation: 'UI/UX Designer',
      coverImg: require('@/assets/images/profile/user-uploads/timeline.jpg'),
    },
    userAbout: {
      about: 'Tart I love sugar plum I love oat cake. Sweet ⭐️ roll caramels I love jujubes. Topping cake wafer.',
      joined: 'November 15, 2015',
      lives: 'Colombo 6',
      email: 'user@kiu.ac.lk',
      website: 'www.kiu.com',
    },
    suggestedPages: [
      {
        avatar: require('@/assets/images/avatars/12-small.png'),
        username: 'Peter Reed',
        subtitle: 'Company',
        favorite: false,
      },
      {
        avatar: require('@/assets/images/avatars/1-small.png'),
        username: 'Harriett Adkins',
        subtitle: 'Company',
        favorite: false,
      },
      {
        avatar: require('@/assets/images/avatars/10-small.png'),
        username: 'Juan Weaver',
        subtitle: 'Company',
        favorite: false,
      },
      {
        avatar: require('@/assets/images/avatars/3-small.png'),
        username: 'Claudia Chandler',
        subtitle: 'Company',
        favorite: false,
      },
      {
        avatar: require('@/assets/images/avatars/5-small.png'),
        username: 'Earl Briggs',
        subtitle: 'Company',
        favorite: true,
      },
      {
        avatar: require('@/assets/images/avatars/6-small.png'),
        username: 'Jonathan Lyons',
        subtitle: 'Beauty Store',
        favorite: false,
      },
    ],
    twitterFeeds: [
      {
        imgUrl: require('@/assets/images/avatars/5-small.png'),
        title: 'Gertrude Stevens',
        id: 'tiana59 ',
        tags: '#design #fasion',
        desc: 'I love cookie chupa chups sweet tart apple pie ⭐️ chocolate bar.',
        favorite: false,
      },
      {
        imgUrl: require('@/assets/images/avatars/12-small.png'),
        title: 'Lura Jones',
        id: 'tiana59 ',
        tags: '#vuejs #code #coffeez',
        desc: 'Halvah I love powder jelly I love cheesecake cotton candy. 😍',
        favorite: true,
      },
      {
        imgUrl: require('@/assets/images/avatars/1-small.png'),
        title: 'Norman Gross',
        id: 'tiana59 ',
        tags: '#sketch #uiux #figma',
        desc: 'Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake.',
        favorite: false,
      },
    ],
    post: [
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-18.jpg'),
        username: 'Lakmini Jinadasa',
        postTime: '31 Oct 2022 at 1:16 AM',
        postText:
          'KIU Convocation 2022 It is with pride and pleasure, KIU announces that the 5th convocation was successfully held on the 15th and 16th of October 2022 at the BMICH Main Auditorium. KIU facilitates students with a profound academic platform and at the 5th convocation, around 1097 students graduated as fully-fledged academic professionals',
        postImg: require('@/assets/images/profile/post-media/img1.png'),
        likes: 1240,
        youLiked: true,
        comments: 1240,
        share: 1240,
        likedUsers: [
          { avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg'), username: 'Trine Lynes' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg'), username: 'Lilian Nenes' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'), username: 'Alberto Glotzbach' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg'), username: 'George Nordic' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg'), username: 'Vinnie Mostowy' },
        ],
        likedCount: 140,
        detailedComments: [
          {
            avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            username: 'Vinura Gunathilaka',
            comment: 'Nice.',
            commentsLikes: 34,
            youLiked: false,
          },

        ],
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-22.jpg'),
        username: 'Thishani Rodrigo',
        postTime: '31 Oct 2022 at 1:16 AM',
        postText:
          'Registrations are now open for October Intake 2022. If you wish to register with KIU please fill out the google form: https://forms.gle/97tsbYZgyJiFLEC66 Feel free to contact us on 0761410953/0765881010 for further details and inquiries',
        postImg: require('@/assets/images/profile/post-media/img2.png'),
        likes: 1240,
        youLiked: true,
        comments: 1240,
        share: 1240,
        likedUsers: [
          { avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg'), username: 'Trine Lynes' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg'), username: 'Lilian Nenes' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'), username: 'Alberto Glotzbach' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg'), username: 'George Nordic' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg'), username: 'Vinnie Mostowy' },
        ],
        likedCount: 271,
        detailedComments: [
          {
            avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
            username: 'Vinura Gunathilaka',
            comment: 'Nice',
            commentsLikes: 34,
            youLiked: false,
          },
        ],
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-15.jpg'),
        username: 'Vinura Gunathilaka',
        postTime: '12 Dec 2019 at 1:16 AM',
        postText:
          'Wonderful Machine· A well-written bio allows viewers to get to know a photographer beyond the work. This can make the difference when presenting to clients who are looking for the perfect fit.',
        postVid: 'https://www.youtube.com/embed/6stlCkUDG_s',
        likes: 1240,
        youLiked: true,
        comments: 1240,
        share: 1240,
        likedUsers: [
          { avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg'), username: 'Trine Lynes' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg'), username: 'Lilian Nenes' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'), username: 'Alberto Glotzbach' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg'), username: 'George Nordic' },
          { avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg'), username: 'Vinnie Mostowy' },
        ],
        likedCount: 264,

      },
    ],
    latestPhotos: [
      { img: require('@/assets/images/profile/user-uploads/user-13.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-02.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-03.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-04.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-05.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-06.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-07.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-08.jpg') },
      { img: require('@/assets/images/profile/user-uploads/user-09.jpg') },
    ],
    suggestions: [
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
        name: 'Peter Reed',
        mutualFriend: '6 Mutual Friends',
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
        name: 'Harriett Adkins',
        mutualFriend: '3 Mutual Friends',
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
        name: 'Juan Weaver',
        mutualFriend: '1 Mutual Friends',
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
        name: 'Claudia Chandler',
        mutualFriend: '16 Mutual Friends',
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
        name: 'Earl Briggs',
        mutualFriend: '4 Mutual Friends',
      },
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg'),
        name: 'Jonathan Lyons',
        mutualFriend: '25 Mutual Friends',
      },
    ],
    polls: [
      {
        name: 'RDJ',
        result: '82%',
        votedUser: [
          { img: require('@/assets/images/portrait/small/avatar-s-12.jpg'), username: 'Tonia Seabold' },
          { img: require('@/assets/images/portrait/small/avatar-s-5.jpg'), username: 'Carissa Dolle' },
          { img: require('@/assets/images/portrait/small/avatar-s-9.jpg'), username: 'Kelle Herrick' },
          { img: require('@/assets/images/portrait/small/avatar-s-10.jpg'), username: 'Len Bregantini' },
          { img: require('@/assets/images/portrait/small/avatar-s-11.jpg'), username: 'John Doe' },
        ],
      },
      {
        name: 'Chris Hemswort',
        result: '67%',
        votedUser: [
          { img: require('@/assets/images/portrait/small/avatar-s-9.jpg'), username: 'Tonia Seabold' },
          { img: require('@/assets/images/portrait/small/avatar-s-1.jpg'), username: 'Carissa Dolle' },
          { img: require('@/assets/images/portrait/small/avatar-s-8.jpg'), username: 'Jonathan Lyons' },
        ],
      },
    ],
  },
}
/* eslint-disable global-require */
mock.onGet('/profile/data').reply(() => [200, data.profileData])
