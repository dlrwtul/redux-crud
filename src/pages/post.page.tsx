import { Add, Help, WarningRounded } from '@mui/icons-material'
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Modal, ModalClose, ModalDialog, Sheet, Typography } from '@mui/joy'
import React, { ReactNode } from 'react'
import PostForm from '../form/post.form'
import PostItem from '../items/post.item'
import { useCreatePostMutation, useDeletePostMutation, useGetPostsQuery, useUpdatePostMutation } from '../services/json-server-api'
import { Post } from '../types/post.type'
import { wrap } from 'module'

type Props = {

}

const PostPage = (props: Props) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [idToDelete, setIdToDelete] = React.useState<number>();
    const [form, setForm] = React.useState<ReactNode>(<></>)
    const { data: posts, isLoading, isSuccess, refetch } = useGetPostsQuery(null, {

    });
    const [createPost, { isLoading : isLoadingCreate }] = useCreatePostMutation();
    const [updatePost, { isLoading : isLoadingUpdate }] = useUpdatePostMutation();
    const [deletePost, { isLoading : isLoadingDelete }] = useDeletePostMutation();

    const onSubmit = (result: { data: any, isUpdate: boolean }) => {
        const {data , isUpdate} = result;
        if (isUpdate) {
            updatePost(data).then(() => {
                refetch();
            });
        }else {
            createPost(data).then(() => {
                refetch();
            });
        }
        handleClose();
    }

    const handleDelete = (id: number) => {
        deletePost(id);
        handleCloseDelete();
        refetch();
    }

    const prepareForm = (value?: any) => {
        handleOpen();
        setForm(<PostForm emitData={onSubmit} defaultValues={value} />);
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenDelete = (id :number) => {
        setIdToDelete(id);
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    return (
        <>
            <Box sx={{ height: "100vh" }}>
                <Box sx={{ height: "10%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '5%', backgroundColor: 'transparent' }}>
                    <Typography component={'h2'}>
                        Redux Crud
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} pt={5} >
                    <Box alignSelf={'flex-end'} sx={{ px: '5%' }}>
                        <Button color='neutral' onClick={() => prepareForm()} startDecorator={<Add />}>New Post</Button>
                    </Box>
                    <Box sx={{ overflowY: 'auto', mx: '5%', mt: 5 }}>
                        {
                            isLoading ? <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}></Box> :
                                (
                                    isSuccess ?
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', transition : 'all 0.6 ease' }}>
                                            {posts.map((post: Post) => <PostItem emitEdit={(id: number) => prepareForm(post)} emitDelete={(id: number) => handleOpenDelete(id)} post={post} />)}
                                        </Box>
                                        :
                                        <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                            <Typography>
                                                No Data
                                            </Typography>
                                        </Box>
                                )
                        }
                    </Box>
                </Box>
            </Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 400,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    {form}
                </Sheet>
            </Modal>
            <Modal open={openDelete} onClose={handleCloseDelete}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to discard this post?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={() => handleDelete(idToDelete!)}>
                            Discard post
                        </Button>
                        <Button variant="plain" color="neutral" onClick={handleCloseDelete}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default PostPage