import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useFetchGetActivities, useFetchGetPriceOrder } from '../hook';
import { GetOrderPriceItem, PackageInterface, ActivityInterface } from '../interfaces';

export const Home = () => {
  const { activities } = useFetchGetActivities();
  const [items, setItems] = useState<GetOrderPriceItem[]>([]);
  const { price } = useFetchGetPriceOrder(items);
  const formik = useFormik({
    initialValues: {
      id: '',
      noClasses: 0
    },
    validationSchema: Yup.object({
      id: Yup.string().required('Selecciona una actividad'),
      noClasses: Yup.number().min(1, 'El número de clases debe ser mínimo 1').required(),
    }),
    onSubmit: (values) => {
      const existItem = items.find((item) => item.id === values.id);
      if (existItem) {
        setItems([
          ...items.map((item: GetOrderPriceItem) => {
            if (item.id === values.id) {
              return {
                id: item.id,
                noClasses: item.noClasses + values.noClasses,
              };
            }
            return item;
          })
        ]);
      } else {
        setItems([
          ...items,
          values,
        ]);
      }
      formik.resetForm();
    },
  });
  const sortActivities = activities.map((activity) => (
    {
     ...activity,
     packages: activity.packages.sort((a: PackageInterface, b: PackageInterface) => a.no_classes - b.no_classes),
   })
  );

  const packages: PackageInterface[] = activities.flatMap((activity: ActivityInterface) => activity.packages.map(item => item));
  const headers = [...new Set(packages.map((item: PackageInterface) => item.no_classes).sort((a, b) => a-b))];
  console.log({ headers });
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              {headers && headers.map((header) => (
                <TableCell key={`header-${header}`} align="right">No. Clases {header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortActivities.map((activity) => (
              <TableRow
                key={activity.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {activity.name}
                </TableCell>
                {headers && headers.map((header) => (
                  <TableCell key={`${activity.name}-package-${header}`} align="right">{activity.packages.find((item: PackageInterface) => item.no_classes === header)?.price || 'N/A'}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider style={{ margin: '15px 0'}}>Formulario</Divider>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
          <TextField
            name='id'
            error={!!formik.errors.id && formik.touched.id}
            onBlur={formik.handleBlur}
            select
            id="activityName"
            label="Actividad"
            onChange={formik.handleChange}
            value={formik.values.id}
            helperText={formik.touched.id ? formik.errors.id : ''}
          >
            {activities && (
              activities.map((activity) => (
                <MenuItem key={activity.id} value={activity.id}>{activity.name}</MenuItem>
              ))
            )}
          </TextField>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
          <TextField
            name="noClasses"
            onBlur={formik.handleBlur}
            error={!!formik.errors.noClasses && formik.touched.noClasses }
            label="No. Clases"
            type="number"
            value={formik.values.noClasses}
            onChange={formik.handleChange}
            helperText={formik.touched.noClasses ? formik.errors.noClasses : ''}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, width: 300}}>
          <Button
            type="submit"
            variant="outlined"
            style={{ padding: '14px 5px'}}
          >
            Agregar Clases
          </Button>
        </FormControl>
      </Box>
      <Divider style={{ margin: '15px 0'}}>Orden de clases</Divider>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Total
              </TableCell>
              <TableCell>
                {price || 0}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>No. de Clases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items && items.map((item, idx) => (
              <TableRow key={`${item.id}-${idx}`}>
                <TableCell>
                  {activities && activities.find((activity) => activity.id === item.id)?.name}
                </TableCell>
                <TableCell>
                  {item.noClasses}
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );     
}
