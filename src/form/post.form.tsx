import { Button, FormControl, FormLabel, Stack, Input, FormHelperText, Typography } from '@mui/joy'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import React, { useEffect } from 'react';

type Props = {
    defaultValues?: FormType,
    emitData: any,
    isLoading : boolean

}

const formSchema = object({
    title: string().required("title required"),
    author: string().required("author required"),
});

type FormType = {
    title: string,
    author: string
};

const PostForm = ({ emitData, defaultValues, isLoading }: Props) => {
    const { handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: defaultValues ? defaultValues : {},
        mode: 'onChange',
    });
    const [loading, setLoading] = React.useState<boolean>(false)

    useEffect(()=> {
        setLoading(isLoading);
    }, [isLoading])
    
    const onSubmit = (data: FormType) => {
        if (defaultValues) {
            emitData({ data: data, isUpdate: true })
            return
        }
        emitData({ data: data, isUpdate: false })
    };

    return (
        <>
            <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
            >
                Create new post
            </Typography>
            <Typography sx={{ mb : 3 }} id="modal-desc" textColor="text.tertiary">
                Fill in the information of the <code> post </code>.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl error={!!errors.title}>
                        <FormLabel>Title</FormLabel>
                        <Input {...register('title')} error={!!errors.title} name='title' autoFocus />
                        <FormHelperText>{errors.title ? errors.title.message : ""}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!errors.author}>
                        <FormLabel>Author</FormLabel>
                        <Input {...register('author')} error={!!errors.author} name='author' />
                        <FormHelperText>{errors.author ? errors.author.message : ""}</FormHelperText>
                    </FormControl>
                    <Button color='neutral' loading={loading} type="submit">Submit</Button>
                </Stack>
            </form>
        </>
    )
}

export default PostForm