.. _FieldMaskers:

Field Maskers
=============

Koverse supports applying policies for obfuscating the values in certain fields for particular groups of users. This capability allows data owners to use fine-grained controls to protect sensitive information as required by company policies or privacy regulations such as HIPAA and GDPR. The obfuscation logic is provided by custom code extensions to Koverse called Field Maskers.

A Field Masker takes a single value and returns an obfuscated value.

To create a custom Field Masker simply create a class that implements the FieldMasker interface.

.. code-block:: java

  @FunctionalInterface
  public interface FieldMasker {

    /**
     * Masks a field field value. The provided object will never be null and null must never be returned.
     * Otherwise, the implementation is free to change the value however is necessary.
     *
     * @param o The field value to mask, is never null.
     * @return  The masked value, must never be null.
     */
    @Nonnull
    Object mask(@Nonnull Object o);
  }

In addition to the main function, Field Maskers can declare a set of parameters that can be used to allow end users to configure the masker. We'll build a simple field masker to illustrate the process.

Example Field Masker
--------------------

In this example we'll implement a Field Masker that obfuscates values using a one-way hash. This can be useful when we want to be able to tell when multiple orders belong to the same customer without disclosing the customer's identifiable information. The one way hash will create a deterministic unique identifier for each customer name.

This way any information about a specific customer can be grouped together by the unique hashed ID and there is no way to recover the original customer name, allowing various groups of analysts to be allowed to process the data without violating customer privacy.

We'll start out by creating a simple class that extends the FieldMasker interface.

.. code-block:: java

  package com.koverse.record.field.maskers;

  import com.koverse.sdk.annotation.Description;
  import com.koverse.sdk.annotation.EnumParameter;
  import com.koverse.sdk.annotation.StringParameter;
  import com.koverse.sdk.record.FieldMasker;

  import java.nio.charset.Charset;
  import java.security.MessageDigest;
  import java.security.NoSuchAlgorithmException;
  import java.util.Base64;

  public class ShaFieldMasker implements FieldMasker {

    private final Charset UTF8 = Charset.forName("UTF-8");

    private String type;

    private String salt;

    @Override
    public Object mask(final Object o) {

      try {
        final String input = o.toString() + salt;
        final MessageDigest messageDigest = MessageDigest.getInstance(type);
        final byte[] digest = messageDigest.digest(input.getBytes(UTF8));

        return Base64.getEncoder().encodeToString(digest);
      } catch (NoSuchAlgorithmException e) {
        throw new RuntimeException("Hash Type not found", e);
      }
    }

  }

Our code references a few variables we haven't initialized: the 'type' and 'salt' fields. We'll annotate these so that the Koverse server knows to present these as parameters to end-users who are applying this masker to their own data. First we'll annotate the 'type' field as an EnumParameter and then annotate the 'salt' field as a StringParameter.

.. code-block:: java

  @EnumParameter(
            id = "type",
            name = "Hash Type",
            groupName = "",
            required = true,
            description = "Choose a hash type",
            values = {"SHA-256", "SHA-512"},
            defaultValue = "SHA-256")
    private String type;

    @StringParameter(
            id = "salt",
            name = "Hash Salt",
            groupName = "",
            required = false,
            description = "Salts the hash",
            hideInput = true,
            defaultValue = "")
    private String salt;

Finally, we'll annotate our class to give our masker a name and a description end-users will see when selecting our masker in the Koverse UI.

.. code-block:: java

  @Description(
        id = "sha-hash-masker",
        name = "SHA Hasher",
        description = "Masks values using one-way SHA hashing",
        majorVersion = 1,
        minorVersion = 0,
        patchVersion = 1)
  public class ShaFieldMasker implements FieldMasker {
    ...
  }

Now we'll need to make a manifest file so the Koverse server finds and loads our class on startup. Make a folder in your project called src/main/resources/META-INF/services. In that folder, create a file called com.koverse.sdk.record.FieldMasker. In that file, we'll put a single line consisting of::

  com.koverse.record.field.maskers.ShaFieldMasker

Now our project is ready to be built. Compile the project into a JAR file and place it on the CLASSPATH of the Koverse Server, such as in the /lib folder, and restart the Koverse Server.

Next we'll apply our new masker to a field in a data set via the Koverse UI.
