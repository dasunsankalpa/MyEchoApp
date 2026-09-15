export const echoes = [
  {
    id: 1,
    place: "Vavuniya Railway Station",
    distance: "20m away",
    lat: 8.7514,
    lng: 80.497,
    title: "My school days",
    memory:
      "I studied here 4 years ago. Every morning I walked past this station on my way to school. The smell of tea from the corner shop still hits me when I think about it.",
    author: "You",
    isMine: true,
    date: "2021",
    reactions: 12,
    placeClosed: false,
    status: "active",
    visibility: "public",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
  },
  {
    id: 2,
    place: "Vavuniya Tea Shop",
    distance: "50m away",
    lat: 8.754,
    lng: 80.499,
    title: "Stopped for tea",
    memory:
      "On my way to Jaffna, I stopped here. The tea was unforgettable and the uncle was so kind. He told me stories about the town while I waited.",
    author: "Anonymous",
    isMine: false,
    date: "2023",
    reactions: 34,
    placeClosed: false,
    status: "active",
    visibility: "public",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    avatar: null,
  },
  {
    id: 3,
    place: "Old Book Shop",
    distance: "120m away",
    lat: 8.755,
    lng: 80.501,
    title: "Where I found my first novel",
    memory:
      "This little shop is where I bought my first book. It closed down last year but the memory stays.",
    author: "Kavitha",
    isMine: false,
    date: "2019",
    reactions: 87,
    placeClosed: true,
    status: "active",
    visibility: "public",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
];

export const notifications = [
  {
    id: 1,
    type: "nearby",
    title: "You just passed an Echo",
    body: "A memory left at Vavuniya Railway Station",
    echoId: 1,
    time: "2 min ago",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
  },
  {
    id: 2,
    type: "react",
    title: "Someone reacted to your Echo",
    body: "Kavitha ❤️ your memory at Vavuniya Railway Station",
    echoId: 1,
    time: "1 hour ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 3,
    type: "reply",
    title: "New reply on your Echo",
    body: '"I remember this place too!"',
    echoId: 1,
    time: "Yesterday",
    avatar: null,
  },
];

export const manyEchoes = Array.from({ length: 200 }, (_, i) => ({
  id: 1000 + i,
  place: "Vavuniya Clock Tower",
  title: `Memory #${i + 1}`,
  memory: "A short memory someone left at this place.",
  author: i % 3 === 0 ? "Anonymous" : `User ${i}`,
  date: "2024",
  reactions: Math.floor(Math.random() * 50),
  avatar:
    i % 4 === 0
      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
      : null,
}));