import Layout from "components/organisms/Layout";
import Text from "components/atoms/Text";
import useCurrentAuth from 'hooks/useCurrentAuth';

export default function HomePage() {
  const { user } = useCurrentAuth();

  return (
    <Layout>
      <Text tag="h1">Hello {user.name}</Text>

      <Text tag="h5">role: {user.role}</Text>
      <Text tag="h5">email: {user.email}</Text>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla
        porttitor massa id neque. Eu sem integer vitae justo. Odio euismod
        lacinia at quis. Cras semper auctor neque vitae. Amet nulla facilisi
        morbi tempus iaculis urna id volutpat. Arcu cursus euismod quis viverra
        nibh cras pulvinar. Sit amet volutpat consequat mauris nunc congue nisi
        vitae. Facilisis magna etiam tempor orci eu lobortis. Volutpat blandit
        aliquam etiam erat. Eu facilisis sed odio morbi. Sed libero enim sed
        faucibus turpis. Dis parturient montes nascetur ridiculus mus mauris
        vitae ultricies leo. Imperdiet nulla malesuada pellentesque elit eget.
      </Text>
    </Layout>
  );
}
