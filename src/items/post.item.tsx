import { Divider, IconButton, Link } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Post } from '../types/post.type';

type Props = {
  post: Post,
  emitEdit : any,
  emitDelete : any
}

const PostItem = ({ post, emitEdit, emitDelete }: Props) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 320, mb : 2 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="neutral"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <Typography sx={{fontSize : 10, color : 'white'}}>Post</Typography>
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          {post.title}
        </Typography>
        <Typography level="body-sm">
          {post.author}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography color='warning' level="body-xs"><Link onClick={() => emitEdit(post.id)}>edit</Link></Typography>
          <Divider orientation="vertical" />
          <Typography color='danger' level="body-xs"><Link onClick={() => emitDelete(post.id)} color='danger'>delete</Link></Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}

export default PostItem